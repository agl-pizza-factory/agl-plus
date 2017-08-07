import 'hammerjs'

import { AUTH_PROVIDERS } from './app.auth'
import { AppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { COMPONENTS } from '../component'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { INITIAL_STATE } from './../state/initial-state'
import { ImageUploadModule } from 'angular2-image-upload'
import { MODULES } from './custom.modules'
import { NgModule } from '@angular/core'
import { PAGES } from './'
import { PIPES } from '../pipe'
import { ROUTES } from './app.routes'
import { RouterModule } from '@angular/router'
import { SERVICES } from '../service'
import { STORES } from '../store'
import { environment } from '../environments/environment'
import { initialize } from 'statex'

initialize(INITIAL_STATE, {
  hotLoad: false, // !environment.production,
  domain: 'agl-plus'
})

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES,
    ...PIPES,
    ...COMPONENTS
  ],
  entryComponents: [
    ...COMPONENTS,
    ...PAGES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ImageUploadModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: false }),
    ...MODULES
  ],
  providers: [
    ...STORES,
    ...SERVICES,
    ...AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
