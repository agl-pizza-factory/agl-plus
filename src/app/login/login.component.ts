import * as _ from 'lodash'
import * as auth0 from 'auth0-js'

import { DataObserver, data } from 'statex/angular'

import { AuthorizeAction } from './../../action/index'
import { Component } from '@angular/core'
import { LogoutAction } from '../../action'
import { RequestAuthCodeAction } from '../../action/index'
import { Router } from '@angular/router'
import { State } from '../../state'
import { User } from './../../state/user'
import { VerifyAuthCodeAction } from '../../action/index'

export const fetchUser = (state: State) => state.user
export const fetchAuthInProgress = (state: State) => state.authInProgress
export const fetchAuthRequired = (state: State) => state.authRequired

type LoginState = 'capture-email' | 'capture-code' | 'loading' | 'login-success' | 'unexpected-error'

@Component({
  selector: 'agl-login',
  template: `
    <div class="page h-100 flex justify-center items-center w-100">
      <div class="shadow-1-l card w-50-l w-100 h-100 h-auto-l flex justify-start flex-column items-center">
        <div class="gradient1 w-100" style="height: 5px"></div>
        <div class="pa4 mw6" style="min-height: 500px">
          <div class="gradient gradient1 w-100"></div>
          <div class="flex w-100 justify-center">
            <img src="assets/img/logo-color.svg" (click)="router.navigate(['home'])"
              class="h3 pointer"/>
          </div>
          <h1 class="primary-text tc" *ngIf="state !== 'login-success'">Login</h1>
          <div class="flex items-center justify-center flex-column" *ngIf="state === 'login-success'">
            <p class="tc">You are now logged in as</p>
            <agl-image className="br-100 w4 w4-l"
              [source]="user?.picture" fallback="assets/img/user.png"> </agl-image>
            <h1 class="primary-text mt1">{{user.name}}</h1>
            <p *ngIf="authRequired" class="mv1 tc error-text">
              It seems that you do not have sufficient privilege to access the page you requested for.
              Please login as a user with sufficient privilege or contact system administrator for details.
            </p>
            <agl-button class="db mt4" icon="ion-ios-lock" (click)="logout()">Logout</agl-button>
          </div>
          <div class="flex items-center justify-center flex-column pt5" *ngIf="state === 'loading'">
            <md-spinner color="accent"></md-spinner>
          </div>
          <form class="flex items-center justify-center flex-column mv3" *ngIf="state === 'capture-email'">
            <p class="tc db mv4">Enter your email to sign in or create an account</p>
            <agl-text-input class="w-100 db"
              label="Email Id"
              icon="ion-ios-mail"
              [value]="email"
              [error]="emailError"
              (change)="onEmailChange($event)"></agl-text-input>
            <agl-button class="db mt4" icon="ion-ios-send" (click)="captureAuthCodeIfValidEmail($event)">Continue</agl-button>
          </form>
          <form class="flex items-center justify-center flex-column mv3" *ngIf="state === 'capture-code'">
            <p class="tc db mv4">An email with the code has been sent to <span class="b">{{email}}.</span></p>
            <agl-text-input class="w-100 db"
              label="Your Code"
              icon="ion-ios-barcode-outline"
              [value]="code"
              [error]="codeError"
              (change)="onAuthCodeChange($event)"></agl-text-input>
            <div class="f5 mt3 pointer primary-text--hover" (click)="captureEmail()">Did not get code?</div>
            <agl-button class="mt4" icon="ion-ios-lock" (click)="validateCodeAndLogin($event)">Login</agl-button>
          </form>
          <div class="flex items-center justify-center flex-column mv3" *ngIf="state === 'unexpected-error'">
            <h2 class="error-text">An unexpected error occurred!</h2>
            <p class="tc db mv4">
              It seems that we can not authenticate you at the moment due to an unexpected error.
              We're focused on the future. It looks like this page hasn't caught up just yet
            </p>
            <div class="f5 mt3 pointer primary-text ttu" (click)="captureEmail()">Back</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent extends DataObserver {

  code: string
  codeError: string
  email: string
  emailError: string
  profileUrl: string
  state: LoginState = 'loading'

  user: User
  authInProgress = true

  @data(fetchAuthRequired)
  authRequired: boolean

  constructor(public router: Router) { super() }

  @data(fetchUser)
  userDidChange(user: User) {
    this.user = user
    this.state = this.calculateState(user, this.authInProgress)
  }

  @data(fetchAuthInProgress)
  authInProgressDidChange(authInProgress) {
    this.authInProgress = authInProgress
    this.state = this.calculateState(this.user, authInProgress)
  }

  captureAuthCodeIfValidEmail(event) {
    event.preventDefault()
    if (this.email == null || this.email.trim() === '') {
      this.emailError = 'Email required'
      return
    }

    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.email)) {
      this.emailError = 'Invalid email'
      return
    }

    this.state = 'loading'
    this.emailError = ''

    new RequestAuthCodeAction(this.email).dispatch().then(
      () => this.state = 'capture-code',
      () => this.state = 'unexpected-error'
    )
  }

  captureEmail() {
    this.emailError = ''
    this.code = ''
    this.codeError = ''
    this.state = 'capture-email'
  }

  logout() {
    new LogoutAction().dispatch()
  }

  validateCodeAndLogin(event) {
    event.preventDefault()
    if (this.code == null || this.code.trim() === '') {
      this.codeError = 'Code required'
      return
    }

    if (!/^[0-9]{6,6}$/.test(this.code)) {
      this.codeError = 'Invalid code'
      return
    }

    this.state = 'loading'

    new VerifyAuthCodeAction(this.email, this.code).dispatch().then(
      () => this.state = this.user ? 'login-success' : this.state,
      () => {
        this.codeError = 'Invalid code'
        this.state = 'capture-code'
      }
    )
  }

  onEmailChange(email) {
    this.email = email
    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.email)) {
      this.emailError = 'Invalid email'
      return
    }
    this.emailError = ''
  }

  onAuthCodeChange(code) {
    this.code = code
    if (!/^[0-9]{6,6}$/.test(this.code)) {
      this.codeError = 'Invalid code'
      return
    }
    this.codeError = ''
  }

  calculateState(user: User, authInProgress?: boolean): LoginState {
    return authInProgress ? 'loading' :
      user ? 'login-success' : 'capture-email'
  }
}