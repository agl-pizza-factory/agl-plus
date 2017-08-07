import { Component, Input } from '@angular/core'

@Component({
  selector: 'agl-wide-card-order',
  template: `
    <div class="flex flex-column tl flex-auto justify-center items-center shadow-1 w-100 divider-br card">
      <div class="w-100 flex flex-column primary items-center">
        <div class="ttu pt4 f5-l f6 pb3 tl w-90 o-80">{{title}}</div>
        <div class="w-90 f5-l f6 flex flex-row ttu o-80">
          <div class="w-50">{{label1}}</div>
          <div class="w-50">{{label2}}</div>
        </div>
        <div class="w-90 flex flex-row ph4 mv2 bt o-60"></div>
        <div class="w-90 flex flex-row pb4 f5 f3-l">
          <div class="w-50">{{value1}}</div>
          <div class="w-50">{{value2}}</div>
        </div>
      </div>
      <div class="flex flex-row-l flex-column pb4">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class WideCardOrderComponent {

  @Input()
  title: string

  @Input()
  label1: string

  @Input()
  value1: string

  @Input()
  label2: string

  @Input()
  value2: string
}
