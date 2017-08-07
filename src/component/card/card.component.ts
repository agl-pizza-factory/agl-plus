import { Component, Input } from '@angular/core'

@Component({
  selector: 'agl-card',
  template: `
    <div class="flex flex-column flex-auto items-center shadow-1 ma2-l ma1 divider-br card tooltip"
      [class.small]="small" [class.wide]="wide">
      <div class="gradient gradient1 w-100"></div>
      <div class="pv4 ph3 relative" [class.pv5]="badge">
        <div class="absolute left-0 accent-1 f6 top-1 dib nowrap ttu pv2 ph3 nl2"
          *ngIf="badge">{{badge}}</div>
        <img [src]="imageUrl" class="h3" *ngIf="imageUrl"/>
        <div [class]="icon + ' f1 accent-text'" *ngIf="icon"></div>
        <div class="pt3 f3 primary-text b ws-normal" *ngIf="title">{{title}}</div>
        <div class="pt3 f4 primary-text o-80 fw5 ws-normal" *ngIf="subtitle">{{subtitle}}</div>
        <div class="pt4 f5 ws-normal" *ngIf="description">{{description}}</div>
        <span class="tooltiptext" *ngIf="tooltip">{{tooltip}}</span>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./card.style.css']
})
export class CardComponent {

  @Input()
  imageUrl: string

  @Input()
  icon: string

  @Input()
  badge: string

  @Input()
  title: string

  @Input()
  small: boolean

  @Input()
  wide: boolean

  @Input()
  subtitle: string

  @Input()
  description: string

  @Input()
  tooltip: string
}