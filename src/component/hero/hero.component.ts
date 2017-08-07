import { Component, HostBinding, Input, OnChanges } from '@angular/core'

@Component({
  selector: 'agl-hero',
  template: `
    <div class="flex flex-auto flex-column w-100 h-100 items-center justify-center">
      <div class="w-100 w-80-m w-70-l pa4 flex flex-auto flex-column items-center justify-center">
        <h1 [class]="titleClass + ' ma0 f2'">{{title}}</h1>
        <div [class]="subtitleClass + ' f4'" [class.pv4]="!half" [class.pv2]="half">{{description}}</div>
        <agl-button *ngIf="button">{{button}}</agl-button>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class HeroComponent implements OnChanges {

  @Input()
  title: string

  @Input()
  description: string

  @Input()
  button: string

  @Input()
  half: boolean

  @Input()
  titleClass = 'primary-text'

  @Input()
  subtitleClass: string

  @Input()
  @HostBinding('style.backgroundImage')
  image: 'url("assets/img/hero-image.jpg")'

  @Input()
  alignBgRight = false

  @HostBinding('class')
  hostClass: string

  ngOnChanges() {
    this.hostClass = `relative vh-${this.half ? '25' : '75'} db overflow-hidden cover `
    this.hostClass += this.alignBgRight ? 'bg-right' : 'bg-left'
  }

}