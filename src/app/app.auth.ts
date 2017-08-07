import { CanActivate } from '@angular/router'
import { Injectable } from '@angular/core'

@Injectable()
export class CanActiveIfLoggedIn implements CanActivate {
  canActivate() {
    const authInfo = JSON.parse(localStorage.getItem('access_info') || 'null')
    return (authInfo && authInfo.idToken != null && authInfo.accessToken != null && authInfo.expiresAt != null
      && new Date().getTime() < authInfo.expiresAt) ? true : false
  }
}

export const AUTH_PROVIDERS = [
  CanActiveIfLoggedIn
]