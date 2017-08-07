import * as auth0 from 'auth0-js'

import { AuthInfo, User } from './../state/user'
import { Headers, Http } from '@angular/http'

import { Injectable } from '@angular/core'
import { RestfulService } from './restful-service'
import { environment } from './../environments/environment'

export const ACCESS_INFO_KEY = 'access_info'
const AUTH_CONFIG = environment.authConfig

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth(AUTH_CONFIG)
  readonly url = `${environment.apiUrl}/customer/authenticate`
  readonly urlCustomerSubmit = `${environment.apiUrl}/customer`

  constructor(public restService: RestfulService) { }

  public requestAuthCode(emailId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth0.passwordlessStart({
        connection: 'email',
        email: emailId,
        send: 'code'
      }, (err, res) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }

  public verifyAuthCode(emailId: string, authCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth0.passwordlessVerify({
        connection: 'email',
        email: emailId,
        verificationCode: authCode
      }, (err, res) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }

  public handleAuthentication(callback: Function): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash({ nonce: AUTH_CONFIG.nonce }, (err, authResult) => {
        // return error
        if (err) {
          return callback(err)
        }

        let authInfo

        // authenticate user
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = ''
          authInfo = this.toAuthInfo(authResult)
        } else {
          authInfo = this.getSession()
        }

        if (authInfo == null) {
          return callback('Not authenticated')
        }

        // fetch user info
        this.fetchUserInfo(authInfo.accessToken)
          .then(user => this.prepareRestfulService(authInfo) || user)
          .then(user => this.toUser(authInfo, user))
          .then((user: User) => this.setSession(user.authInfo) || user)
          .then((user: User) => callback(undefined, user) || user)
          .then(resolve, error => {
            reject(error)
            callback(error)
          })
      })
    })
  }

  public fetchUserInfo(accessToken: string) {
    return new Promise((resolve, reject) => {
      this.auth0.client.userInfo(accessToken, function (err, user) {
        if (err) { return reject(err) }
        resolve(Object.assign({ authorized: true }, user))
      })
    })
  }

  public logout(): void {
    this.clearSession()
    this.auth0.logout({
      returnTo: AUTH_CONFIG.redirectUri
    })
  }

  public isAuthenticated(): boolean {
    const authInfo: AuthInfo = this.getSession()
    return authInfo && new Date().getTime() < authInfo.expiresAt
  }

  private prepareRestfulService(authInfo: AuthInfo) {
    this.restService.setHeaders({
      'Authorization': authInfo != null ? `${authInfo.tokenType} ${authInfo.idToken}` : undefined
    })
  }

  private toAuthInfo(authResult) {
    return authResult ? {
      accessToken: authResult.accessToken,
      expiresAt: (authResult.expiresIn * 1000) + new Date().getTime(),
      idToken: authResult.idToken,
      refreshToken: authResult.refreshToken,
      tokenType: authResult.tokenType,
    } : undefined
  }

  private toUser(authInfo: AuthInfo, user): User {
    return user ? {
      id: user.customerID,
      email: user.email_verified ? user.email : undefined,
      name: (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : user.nickname || user.name,
      picture: user.picture,
      nmi: user.nmi,
      address1: user.addressLine1,
      address2: user.addressLine2,
      state: user.state,
      postCode: user.postCode,
      mobile: user.mobile,
      authInfo: Object.assign({
        role: user.role
      }, authInfo)
    } : undefined
  }

  private getSession(): AuthInfo {
    return JSON.parse(localStorage.getItem(ACCESS_INFO_KEY) || 'null')
  }

  private setSession(authInfo: AuthInfo): void {
    localStorage.setItem(ACCESS_INFO_KEY, JSON.stringify(authInfo))
  }

  private clearSession(): void {
    localStorage.removeItem(ACCESS_INFO_KEY)
  }

}