import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core'

export interface CheckboxOption {
  text?: string
  checked?: boolean
}

@Component({
  selector: 'agl-checkbox-group',
  template: `
    <div class="flex flex-wrap flex-column items-center w-100">
      <md-checkbox *ngFor="let option of options; let i = index" [checked]="option?.checked"
        class="flex w-100 w-50-l db mb3" (change)="checkState($event.checked,i)">{{option?.text}}</md-checkbox>
    </div>
  `
})
export class CheckboxGroupComponent {
  checked: number[] = []

  @Input()
  options: CheckboxOption[]

  @Output()
  checkedState: EventEmitter<number[]> = new EventEmitter<number[]>()

  @HostBinding('class')
  className = 'db w-100'

  checkState(checked, index) {
    if (checked) {
      this.checked.push(index)
    } else {
      if (this.checked.length !== 0) {
        this.checked.pop()
      }
    }
    this.checkedState.emit(this.checked)
  }

}