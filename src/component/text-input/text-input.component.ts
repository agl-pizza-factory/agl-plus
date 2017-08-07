import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core'

@Component({
  selector: 'agl-text-input',
  template: `
    <div class="card flex justify-center items-center ba br2 w-100 pa3 h3"
      [class.divider-br]="!focus && !isDefined(error)" [class.primary-br]="focus && !isDefined(error)"
      [class.error-br]="isDefined(error)"
      [class.progress]="loading" [class.divider]="disabled"
      (click)="focusInput()">
      <div [class]="icon + ' f3 pr2 o-60'" *ngIf="isDefined(icon)"></div>
      <md-input-container class="w-100 mv2">
        <input #input mdInput type="text" class="h-100 w-100" [placeholder]="label"
          [disabled]="disabled" (focus)="onFocus()" (blur)="onBlur()" [(ngModel)]="value"
          (change)="onChange($event)"/>
      </md-input-container>
      <div [class]="iconButton + ' accent f3 h3 w3 nr3 flex items-center justify-center bt bb br2 br--right'"
       [class.divider-br]="!focus && !isDefined(error)" [class.primary-br]="focus && !isDefined(error)"
      *ngIf="isDefined(iconButton)" (click)="action.emit()"></div>
    </div>
    <div class="error-text tl mt1" *ngIf="isDefined(error)">{{error}}</div>
  `
})
export class TextInputComponent {

  @Input()
  label: string

  @Input()
  icon: string

  @Input()
  iconButton: string

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

  @ViewChild('input')
  input: ElementRef

  focus = false

  isDefined(value) {
    return value != null && value.trim() !== ''
  }

  onFocus() {
    this.focus = true
  }

  onBlur() {
    this.focus = false
    this.change.emit(this.value)
  }

  onChange(event) {
    event.stopPropagation()
    this.change.emit(this.value)
  }

  focusInput() {
    this.input.nativeElement.focus()
  }

}