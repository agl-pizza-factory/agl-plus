import { Component, EventEmitter, Input, Output } from '@angular/core'

export interface Action {
  id?: string
  text?: string
  icon?: string
}

@Component({
  selector: 'agl-quick-actions',
  template: `
    <div class="flex justify-center w-100 pt2">
      <div class="card shadow-1 flex nt5 relative">
        <div *ngFor="let action of actions; let i = index"
          class="pointer pa2 ma3 ph4-l nowrap ttu bw2"
          [class.bb]="i === selectedIndex"
          [class.accent-br]="i === selectedIndex"
          (click)="selectItem(i)"  >
          <div [class]="action?.icon + ' f3 mb2 ' + (i === selectedIndex ? 'accent-text' : 'primary-text')">
          </div>
          <div class="f6">{{action?.text}}</div>
        </div>
      </div>
    </div>
  `
})
export class QuickActionsComponent {

  @Input()
  actions: Action[]

  @Input()
  selectedIndex = 0

  @Output()

  change: EventEmitter<Action> = new EventEmitter<Action>()

  selectItem(index: number) {
    this.selectedIndex = index
    this.change.emit(this.actions[index])
  }
}