import { Component, Input } from '@angular/core'

@Component({
  selector: 'agl-section',
  template: `
    <div class="flex flex-column items-center justify-center" [class.card]="light">
      <div class="flex flex-column items-center justify-center pa4 w-100 w-100-m w-90-l">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class SectionComponent {

  @Input()
  light: boolean

}