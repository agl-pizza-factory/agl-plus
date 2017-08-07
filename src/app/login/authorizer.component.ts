import { Component, OnInit } from '@angular/core'

import { AuthorizeAction } from './../../action/index'

@Component({
  selector: 'agl-authorizer',
  template: `
    <div class="flex flex-column items-center justify-center w-100 h-100 page">
      <div class="primary-text f3">Please wait...</div>
      <div class="flex w3 h3">
        <md-spinner class="db" color="accent"></md-spinner>
      </div>
    </div>
  `
})
export class AuthorizerComponent implements OnInit {

  ngOnInit() {
    new AuthorizeAction(undefined).dispatch()
  }
}