import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output } from '@angular/core'

export interface Option {
  text?: string
  value?: string
}

@Component({
  selector: 'agl-selection',
  template: `
    <div class="card flex justify-center items-center ba br2 w-100 pa3 h3 relative"
      [class.divider-br]="!isDefined(error)"
      [class.error-br]="isDefined(error)"
      [class.progress]="loading" [class.divider]="disabled">
      <md-input-container class="w-100 mv2">
        <input mdInput type="text" class="h-100 w-100" [placeholder]="label" id="statusInput"
          [disabled]="disabled" (focus)="onFocus()" (blur)="onBlur()" [value]="getText(value)"
          (change)="onChange()"/>
      </md-input-container>
      <div [class]="icon + ' f3 pl2 o-60'" *ngIf="isDefined(icon)" (click)="open = true"></div>
      <div class="card shadow-1 absolute left-0 top-0 w-100 ba divider-br br2 min-h-100"
        [class.db]="open" [class.dn]="!open">
        <div *ngFor="let option of options"
          class="tl flex items-center h2 ph3 pointer nowrap accent--hover"
           (click)="onClickOption(option)">
           <div class="w-100">{{option.text}}</div>
           <div class="ion-ios-checkmark-circle" *ngIf="value === (option.value || option.text)"></div>
        </div>
      <div>
    </div>
    <div class="error-text tl mt1" *ngIf="isDefined(error)">{{error}}</div>
  `
})
export class SelectionComponent implements OnInit, OnChanges {

  @Input()
  label: string

  @Input()
  value: string

  @Input()
  options: Option[] = []

  @Input()
  loading: boolean

  @Input()
  disabled: boolean

  @Input()
  open: boolean

  @Input()
  error: string

  @Input()
  inlineLabel = true

  @Output()
  change: EventEmitter<string> = new EventEmitter<string>()

  @HostBinding('class')
  className = 'w-100 db relative'

  focus = false
  placeholder: string
  icon = 'ion-ios-arrow-dropdown-circle'

  ngOnInit() {
    this.placeholder = this.label
  }

  ngOnChanges() {
    this.placeholder = this.label
  }

  isDefined(value) {
    return value != null && value.trim() !== ''
  }

  onFocus() {
    this.focus = true
    this.open = true
  }

  onBlur() {
    this.focus = false
    this.placeholder = this.label
  }

  onChange() {
    this.change.emit(this.value)
  }

  isShowLargeLabel() {
    return this.inlineLabel && this.isDefined(this.label) && this.isDefined(this.value)
  }

  getText(value) {
    if (value == null) { return '' }
    return ((this.options || []).find(option => option.value === value) || {}).text ||
      ((this.options || []).find(option => option.text === value) || {}).text
  }

  onClickOption(option: Option) {
    this.open = false
    this.value = option.value
    this.change.emit(this.value)
  }

}