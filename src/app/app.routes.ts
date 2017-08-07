import { AuthorizerComponent } from './login/authorizer.component'
import { CanActiveIfLoggedIn } from './app.auth'
import { HomePageComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { PageNotFoundComponent } from './not-found/page-not-found.component'
import { Routes } from '@angular/router'

export const ROUTES: Routes = [
  { path: 'home', component: HomePageComponent, canActivate: [CanActiveIfLoggedIn] },
  { path: 'login', component: LoginComponent },
  { path: 'authorize', component: AuthorizerComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]
