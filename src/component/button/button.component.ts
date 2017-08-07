import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'agl-button',
  template: `
    <button (click)="emitClick($event)"
       [class.ph5]="!small" [class.pv3]="!small"  [class.f7]="!small"
       [class.ph3]="small" [class.pv2]="small" [class.f6]="small"
       class="ttu nowrap br2 flex items-center ba divider-br"
       [class.primary]="primary"
       [class.accent]="!primary"
       [disabled]="disabled"
       [class.divider]="disabled">
        <i [class]="icon + ' f4 mr2'" *ngIf="icon"></i>
        <div class="f6"><ng-content></ng-content></div>
    </button>
  `
})
export class ButtonComponent {

  @Input()
  small: boolean

  @Input()
  icon: string

  @Input()
  disabled: boolean

  @Input()
  primary: boolean

  @Output()
  click: EventEmitter<Event> = new EventEmitter<Event>()

  emitClick(event) {
    if (this.disabled) { return true }
    this.click.emit(event)
  }

}