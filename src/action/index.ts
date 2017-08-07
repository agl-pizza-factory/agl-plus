import { Action } from 'statex'
import { User } from './../state/user'

export class EnableAuthAction extends Action {
  constructor() { super() }
}
export class AuthorizeAction extends Action {
  constructor(public redirectUrl: string) { super() }
}
export class LogoutAction extends Action {
  constructor() { super() }
}
export class RequestAuthCodeAction extends Action {
  constructor(public emailId: string) { super() }
}
export class VerifyAuthCodeAction extends Action {
  constructor(public emailId: string, public authCode: string) { super() }
}
export class SetAuthRequiredAction extends Action {
  constructor(public authRequired: boolean, public redirectUrl?: string) { super() }
}
