import { Component } from '@angular/core'

@Component({
  selector: 'agl-dashed-header',
  template: `
    <div class="flex pt3 pb3 items-center justify-center o-60">
      <div class="bt flex-auto title-br o-30"></div>
      <div class="ttu f6 pa2 ph4 title-text">
        <ng-content></ng-content>
      </div>
      <div class="bt flex-auto title-br o-30"></div>
    </div>
  `
})
export class DashedHeaderComponent {

}