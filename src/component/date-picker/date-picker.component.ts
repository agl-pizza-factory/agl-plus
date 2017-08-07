import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core'
import { MdDatepicker, MdDatepickerInput } from '@angular/material'

@Component({
  selector: 'agl-date-picker',
  template: `
    <div class="card ba br2 w-100 pa3 relative h3"
      [class.divider-br]="!focus && !isDefined(error)" [class.primary-br]="focus && !isDefined(error)"
      [class.error-br]="isDefined(error)"
      [class.progress]="loading" [class.divider]="disabled">
      <div class="flex items-center">
        <md-input-container class="flex mv2 w-100">
          <input #datepickerInput mdInput (focus)="onFocus()" (change)="onChange(value)"
             [mdDatepicker]="datePicker" [placeholder]="label" [(ngModel)]="value"
             [disabled]="disabled" (input)="onChange(value)" (blur)="onBlur()">
        </md-input-container>
        <div class="f3 ion-ios-calendar-outline" (click)="open()"></div>
      </div>
      <md-datepicker #datePicker [touchUi]="true" (selectedChanged)="onChange($event)"></md-datepicker>
    </div>
    <div class="error-text tl mt1" *ngIf="isDefined(error)">{{error}}</div>
  `
})
export class DatePickerComponent {

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

  @HostBinding('class')
  className = 'w-100 db relative'

  focus = false

  @ViewChild(MdDatepicker) datepicker: MdDatepicker<Date>
  @ViewChild(MdDatepickerInput) datepickerInput: MdDatepickerInput<Date>

  isDefined(value) {
    return value != null && value.trim() !== ''
  }

  open() {
    if (this.disabled) { return }
    this.datepicker.open()
  }

  onFocus() {
    this.focus = true
  }

  onChange(value) {
    this.value = value
    this.focus = false
    this.error = ''
    this.change.emit(this.value)
  }

  onBlur() {
    this.change.emit(this.value)
  }

}