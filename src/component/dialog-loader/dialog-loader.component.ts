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
  selector: 'agl-dialog-loader',
  template: `
  <div class="flex flex-column tl flex-auto justify-center items-center relative" style="max-width: 700px">
    <md-card>
      <md-card-content>
        <md-spinner color="primary"></md-spinner>
      </md-card-content>
    </md-card>
  </div>
  `,
})
export class DialogLoaderComponent {

  @Input()
  small: boolean

  constructor(public dialogRef: MdDialogRef<DialogLoaderComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

}