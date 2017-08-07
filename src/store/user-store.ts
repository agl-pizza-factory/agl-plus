import { Store, action } from 'statex/angular'

import { AuthService } from './../service/auth-service'
import { AuthorizeAction } from '../action'
import { EnableAuthAction } from '../action'
import { Injectable } from '@angular/core'
import { LogoutAction } from '../action'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { RequestAuthCodeAction } from '../action'
import { Router } from '@angular/router'
import { SetAuthRequiredAction } from '../action'
import { State } from '../state'
import { User } from '../state'
import { VerifyAuthCodeAction } from './../action/index'

const REDIRECT_URL_KEY = 'redirect_url'

@Injectable()
export class UserStore extends Store {

  _redirectUrl: string

  constructor(private authService: AuthService, public router: Router) {
    super()
  }

  get redirectUrl() {
    return this._redirectUrl ||
      (this._redirectUrl = localStorage.getItem(REDIRECT_URL_KEY) || 'home')
  }

  set redirectUrl(url: string) {
    this._redirectUrl = url
    if (url != null && (url || '').trim() !== '') {
      localStorage.setItem(REDIRECT_URL_KEY, url)
    }
  }

  removeRedirectUrl() {
    localStorage.removeItem(REDIRECT_URL_KEY)
  }

  @action()
  enableAuth(state: State, action: EnableAuthAction): Observable<State> {
    return Observable.create((observer: Observer<State>) => {
      observer.next({ authInProgress: true })
      this.authService.handleAuthentication((error, user: User) => {
        observer.next({ authInProgress: false })
        if (error) { return observer.next({ user: undefined }) }
        observer.next({ user })
        if (user != null && state.user == null) {
          this.router.navigate([this.redirectUrl])
          this.removeRedirectUrl()
        }
      })
    })
  }

  @action()
  setAuthRequired(state: State, action: SetAuthRequiredAction): State {
    action.redirectUrl == null ? this.removeRedirectUrl() : this.redirectUrl = action.redirectUrl
    return { authRequired: action.authRequired }
  }

  @action()
  authorize(state: State, action: AuthorizeAction): State {
    this.redirectUrl = action.redirectUrl
    this.router.navigate(['login'])
    return { authRequired: true, user: this.authService.isAuthenticated() ? state.user : undefined }
  }

  @action()
  logout(state: State, action: LogoutAction): State {
    this.authService.logout()
    return state
  }

  @action()
  requestAuthCode(state: State, action: RequestAuthCodeAction): Promise<State> {
    return this.authService.requestAuthCode(action.emailId).then(() => state)
  }

  @action()
  verifyAuthCode(state: State, action: VerifyAuthCodeAction): Promise<State> {
    return this.authService.verifyAuthCode(action.emailId, action.authCode).then(() => state)
  }

}