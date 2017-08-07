import { AuthorizeAction, LogoutAction } from './../../action/index'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DataObserver, data } from 'statex/angular'

import { Router } from '@angular/router'
import { State } from './../../state/state'
import { User } from './../../state/user'

export interface MenuItem {
  id?: string
  text?: string
  url?: string[]
}

export const fetchUser = (state: State) => state.user

@Component({
  selector: 'agl-header',
  template: `
    <div class="card flex flex-column flex-row-l" [class.shadow-2]="showMenu" (click)="toggleMenu()">
      <div class="flex ml4 pl2 pl0-l ml2-l w3 mr2 mv1 justify-center items-center">
        <img src="assets/img/logo-color.svg" (click)="router.navigate([''])"
          class="h2 ma1 pointer"/>
      </div>
      <div class="ion-md-menu absolute f2 mv1 mh3 dn-l top-0"></div>
      <div class="flex-l flex-auto mt0-l relative-l w-100 white vh100 dn a"
        [class.dn]="!showMenu">
        <div class="flex flex-auto flex-column justify-end">
          <div class="flex f6 flex-column flex-row-l">
            <div class="ttu pa2 pr3-l pointer nowrap">About AGL</div>
            <div class="ttu pa2 pr3-l pointer nowrap">Contact Us</div>
          </div>
          <div class="primary flex items-center flex-column flex-row-l">
            <div class="ttu pa3-l pa0 pv2 pointer nowrap w-100 w-auto-l"
              *ngFor="let item of menuItems; let i = index"
              [class.accent]="i === selectedItem"
              (click)="onMenuItemClick($event, i)">{{item.text}}</div>
            <div class="flex justify-end items-center flex-auto mr2-l mb2 mb0-l">
              <div class="flex items-center pointer" (click)="gotoLoginPage()" *ngIf="user">
                 <div class="mr2">{{user.name}}</div>
                 <agl-image className="br-100 w2"
                   [source]="user.picture" fallback="assets/img/user.png"> </agl-image>
              </div>
              <agl-button [small]="true" icon="ion-ios-lock"
                (click)="gotoLoginPage()" *ngIf="!user">Login</agl-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HeaderComponent extends DataObserver implements OnInit {

  @data(fetchUser)
  user: User

  @Input()
  menuItems: MenuItem[] = [
    { text: 'Home', url: ['/home'], id: '1' },
    { text: 'Page 1', url: ['/page1'], id: '2' },
    { text: 'Page 2', url: ['/page2'], id: '3' },
    { text: 'Page 3', url: ['/page3'], id: '4' }
  ]

  @Input()
  selectedItem

  @Output()
  click: EventEmitter<Event> = new EventEmitter<Event>()

  showMenu: boolean
  loggedIn: boolean

  constructor(public router: Router) { super() }

  ngOnInit() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    this.loggedIn = new Date().getTime() < expiresAt
  }

  toggleMenu() {
    this.showMenu = !this.showMenu
  }

  onMenuItemClick(event, index) {
    event.stopPropagation()
    if (this.selectedItem === index) {
      this.showMenu = false
      return
    }
    this.selectedItem = index
    this.router.navigate(this.menuItems[index].url)
  }

  gotoLoginPage() {
    this.router.navigate(['login'])
  }
}