import { Component, OnInit } from '@angular/core'
import { Event, NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router'

import { AuthorizeAction } from './../action'
import { EnableAuthAction } from '../action'
import { SetAuthRequiredAction } from './../action'
import { Stores } from '../store'

declare const liveChatFunction: Function
@Component({
  selector: 'agl-root',
  template: `
    <router-outlet></router-outlet>
  `
})

export class AppComponent implements OnInit {

  constructor(stores: Stores, public router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      // navigate to top whenever url changes
      window.scrollTo(0, 0)
      // if cancel event authorize
      if (event instanceof NavigationCancel) {
        new AuthorizeAction(event.url).dispatch()
      } else if (event instanceof NavigationEnd && !/^\/(authorize|login)/.test(event.url)) {
        new SetAuthRequiredAction(false, event.url).dispatch()
      }
    })

    new EnableAuthAction().dispatch()
  }

}
