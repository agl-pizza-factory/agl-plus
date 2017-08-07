import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core'

@Component({
  selector: 'agl-text-area',
  template: `
    <div class="card flex justify-center items-center ba overflow-hidden br2 w-100 pa3"
      [class.divider-br]="!focus && !isDefined(error)" [class.primary-br]="focus && !isDefined(error)"
      [class.error-br]="isDefined(error)"
      [class.progress]="loading" [class.divider]="disabled">
      <md-input-container class="w-100 mv2">
        <textarea mdInput type="text" class="h-100 w-100" [placeholder]="label" rows="4"
          [disabled]="disabled" (focus)="onFocus()" (blur)="onBlur()" [(ngModel)]="value"
          (change)="onChange()" style="resize: vertical">
        </textarea>
      </md-input-container>
    </div>
    <div class="error-text tl mt1" *ngIf="isDefined(error)">{{error}}</div>
  `
})
export class TextAreaComponent {

  @Input()
  label: string

  @Input()
  value: string

  @Input()
  loading: boolean

  @Input()
  disabled: boolean

  @Input()
  error: string

  @Input()
  inlineLabel = true

  @Output()
  change: EventEmitter<string> = new EventEmitter<string>()

  @Output()
  action: EventEmitter<void> = new EventEmitter<void>()

  @HostBinding('class')
  className = 'w-100 db relative'

  focus = false

  isDefined(value) {
    return value != null && value.trim() !== ''
  }

  onFocus() {
    this.focus = true
  }

  onBlur() {
    this.focus = false
  }

  onChange() {
    this.change.emit(this.value)
  }

}