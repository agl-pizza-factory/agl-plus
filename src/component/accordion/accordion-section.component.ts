import { Component, Input } from '@angular/core'

@Component({
  selector: 'agl-accordion-section',
  template: `
    <div class="flex flex-column w-100">
      <div class="flex w-100">
        <div class="primary-text mr2"
          [class.ion-ios-arrow-dropup-outline]="open"
          [class.ion-ios-arrow-dropdown-outline]="!open" ></div>
        <div class="primary-text tl pointer pb3" (click)="open = !open">{{title}}</div>
      </div>
      <ng-content *ngIf="open"></ng-content>
    </div>
  `
})
export class AccordionSectionComponent {

  @Input()
  title: string

  @Input()
  open
}