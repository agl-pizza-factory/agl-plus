import { Component, HostBinding, Input } from '@angular/core'

@Component({
  selector: 'agl-profile',
  template: `
    <div class="flex flex-column w-40-l">
      <agl-image className="br-100 w4 w5-l"
        [source]="imageUrl" fallback="assets/img/user.png"> </agl-image>
    </div>
    <div class="flex flex-column justify-center flex-auto pl4">
      <div class="b primary-text pointer">{{name}}</div>
      <div class="pv2 o-80">{{company}}</div>
      <div class="flex">
        <agl-stars [stars]="stars"></agl-stars>
        <div class="f7 pl2 o-60">({{reviews}})</div>
      </div>
      <div class="pa1 o-80">
        <i class="ion-ios-checkmark-circle accent-text pr2"></i> {{description}}
      </div>
    </div>
  `
})
export class ProfileComponent {

  @Input()
  imageUrl: string

  @Input()
  name: string

  @Input()
  company: string

  @Input()
  stars: number

  @Input()
  reviews: number

  @Input()
  description: string

  @HostBinding('class')
  className = 'flex'

}