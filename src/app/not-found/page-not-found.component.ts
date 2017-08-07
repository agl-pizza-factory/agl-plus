import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'agl-page-not-found',
  template: `
    <div class="flex flex-column items-center justify-center h-100 ph4">
      <div class="w-40-ns w-90 w-60-m tc flex flex-column items-center">
        <h1 class="primary-text ma0">We can't find the page you're looking for.</h1>
        <p class="pv3">We're focused on the future. It looks like this page hasn't caught up just yet.</p>
        <agl-button (click)="router.navigate(['/'])">Back to Home</agl-button>
      </div>
    </div>
  `
})
export class PageNotFoundComponent {

  constructor(public router: Router) { }
}