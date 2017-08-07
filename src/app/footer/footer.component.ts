import { Component } from '@angular/core'

@Component({
  selector: 'agl-footer',
  template: `
    <div class="primary flex flex-auto pa2">
      <img src="assets/img/logo-white.svg" class="absolute h2 ma2 o-60"/>
      <div class="flex flex-auto flex-column items-center justify-center">
        <div class="flex f3 items-center justify-center tc">
          <div class="pointer o-80 glow divider--hover pa2 ion-logo-facebook"></div>
          <div class="pointer o-80 glow divider--hover pa2 ion-logo-googleplus"></div>
          <div class="pointer o-80 glow divider--hover pa2 ion-logo-twitter"></div>
          <div class="pointer o-80 glow divider--hover pa2 ion-logo-linkedin"></div>
        </div>
        <div class="pa2 o-80 f7">
          Copyright © All Rights Reserved
        </div>
      </div>
    </div>
  `
})
export class FooterComponent { }