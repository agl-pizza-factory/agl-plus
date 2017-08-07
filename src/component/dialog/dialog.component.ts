import { Component, HostBinding, Inject, Input } from '@angular/core'
import {
  MD_DIALOG_DATA,
  MdButton,
  MdDialog,
  MdDialogActions,
  MdDialogClose,
  MdDialogContent,
  MdDialogRef,
  MdDialogTitle,
} from '@angular/material'

@Component({
  selector: 'agl-dialog-result',
  template: `
  <div class="flex flex-column tl flex-auto justify-center items-center br2">
      <div [class]="data.headerClass + ' flex flex-column items-center'">
        <h2 class="ttu">{{data.title}}</h2>
      </div>
      <div class="flex flex-row-l flex-column f4 w-100">
        <div class="flex-column pt2">
          <div>{{data.content}}</div>
            <div md-dialog-actions>
              <div class="flex flex-wrap w-100 items-center justify-center">
                <div *ngFor="let option of data.options" class="ma3">
                  <button  [class.ph5]="!small" [class.pv3]="!small"  [class.f7]="!small"
                    [class.ph3]="small" [class.pv1]="small" [class.f6]="small"
                    [class]=" option.class +' ttu nowrap br2 flex items-center justify-center ba divider-br ph5 pv3 w-100'"
                    md-button [md-dialog-close]="option.content">
                    <i [class]="icon + ' f4 mr2'" *ngIf="icon"></i>
                    <div class="f6 ">{{option.content}}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  `,
})
export class DialogComponent {

  @Input()
  small: boolean

  @HostBinding('style.maxWidth')
  style = '700px'

  @HostBinding('class')
  className = 'db'

  constructor(public dialogRef: MdDialogRef<DialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

}