import { Component, HostBinding, Input, OnInit } from '@angular/core'

type Mode = 'preview' | 'edit' | 'upload' | 'no-image'

@Component({
  selector: 'agl-slide-show',
  template: `
    <div [ngSwitch]="mode">
      <div class="flex flex-column h-100 w-100 relative vh-75" *ngSwitchCase="'preview'">
        <div class="absolute w-100 h-100 flex-auto flex">
          <img #img [src]="selectedImage" class="fit-cover flex-auto fade-in"
            *ngIf="selectedImage" />
        </div>
        <div class="absolute w-100 h-100 flex items-center justify-center" *ngIf="selectedImage">
          <div class="divider--hover flex items-center ion-ios-arrow-back pa5 h-100 f1 o-50 glow pointer"
            (click)="goBackward()"></div>
          <div class="flex-auto"></div>
          <div class="divider--hover flex items-center ion-ios-arrow-forward pa5 h-100 f1 o-50 glow pointer"
            (click)="goForward()"></div>
        </div>
        <div class="absolute w-100 bottom-0 z1 h1 mb3 w-100 overflow-hidden overflow-x-auto nowrap">
          <div *ngFor="let image of images; let i = index"
            class="w1 h1 br-100 ba divider-br mh1 pointer dib v-top"
            [class.divider]="i != selectedIndex"
            [class.white]="i == selectedIndex"
            (click) = "selectedIndex = i; setAutoForward()" ></div>
        </div>
      </div>

      <div class="flex flex-column h-100 w-100 relative vh-75" *ngSwitchCase="'no-image'">
        <div class="absolute w-100 h-100 flex-auto flex">
          <div class="flex flex-column o-60 items-center justify-center f1 flex-auto ion-ios-images">
            <div class="ma2 f6">No Image</div>
          </div>
        </div>
      </div>

      <div class="flex flex-column h-100 w-100 relative vh-75" *ngSwitchCase="'upload'">
        <div class="absolute w-100 h-100 flex-auto flex flex-column">
          <div class="flex flex-column items-center justify-center f1 flex-auto ion-ios-images">
            <agl-button class="mt3">Upload Image</agl-button>
          </div>
        </div>
      </div>

      <div class="flex flex-column h-100 w-100 relative vh-75" *ngSwitchCase="'edit'">
        <div class="flex flex-wrap items-start justify-start content-start overflow-auto w-100 h-100 pa3">
          <div *ngFor="let image of images; let i = index"
            class="w4 ba divider-br ma1 pointer dib v-top relative">
            <div class="absolute right-0 top-0 accent-text ma2 f3"
              [class.ion-ios-checkmark-circle]="selectedImages.indexOf(i) >= 0"
              [class.ion-ios-radio-button-off]="selectedImages.indexOf(i) < 0"
              (click) = "toggleImageSelection(i)"></div>
            <img class="fit-cover w-100 h-100"
              [src]="image"
              [class.divider]="i != selectedIndex"
              [class.white]="i == selectedIndex"
              (click)="openImage(i)"/>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center ma3" *ngIf="editable || uploadable">
      <div *ngIf="uploadable"
        class="f3 mh3 pointer o-80 glow primary-text--hover ion-ios-camera"
        (click)="switchMode('upload')"></div>
      <div *ngIf="editable && images.length > 0"
        class="f3 mh3 pointer o-80 glow primary-text--hover"
        [class.ion-ios-contract]="!editMode"
        [class.ion-ios-expand]="editMode"
        (click)="toggleBetweenPreviewAndEditModes()"></div>
      <div *ngIf="editable && mode === 'edit'"
        class="f3 mh3 pointer o-80 glow primary-text--hover"
        [class.ion-ios-checkmark-circle]="selectedImages.length === images.length"
        [class.ion-ios-radio-button-off]="selectedImages.length !== images.length"
        (click) = "toggleSelectionAll()"></div>
      <div *ngIf="editable && selectedImages.length > 0"
        class="f3 mh3 pointer o-80 glow primary-text--hover ion-ios-trash"
        (click)="removeSelectedImages()"></div>
    </div>
  `,
  styleUrls: ['./slide-show.style.css']
})
export class SlideShowComponent implements OnInit {

  @Input()
  images: string[]

  @Input()
  selectedIndex = 0

  @Input()
  autoScroll = true

  @Input()
  editable = false

  @Input()
  uploadable = false

  @Input()
  timeout = 2500

  interval
  mode: Mode = 'preview'
  selectedImages = []

  @HostBinding('class')
  className = 'db shadow-1 page divider ba divider-br w-100'

  get selectedImage() {
    return (this.images || [])[this.selectedIndex || 0]
  }

  ngOnInit() {
    this.setAutoForward()

  }

  setAutoForward() {
    clearInterval(this.interval)
    if (!this.autoScroll) { return }
    this.interval = setInterval(() => this.goForward(), this.timeout)
  }

  goForward() {
    this.selectedIndex++
    if (this.selectedIndex >= (this.images || []).length) {
      this.selectedIndex = 0
    }
    this.setAutoForward()
  }

  goBackward() {
    this.selectedIndex--
    if (this.selectedIndex < 0) {
      this.selectedIndex = (this.images || []).length - 1
    }
    this.setAutoForward()
  }

  toggleImageSelection(index) {
    if (this.selectedImages.indexOf(index) >= 0) {
      this.selectedImages = this.selectedImages.filter(i => i !== index)
    } else {
      this.selectedImages = this.selectedImages.concat(index)
    }
  }

  removeSelectedImages() {
    this.images = this.images.filter((url, index) => this.selectedImages.indexOf(index) < 0)
    this.selectedImages = []
    this.validateMode()
  }

  validateMode() {
    if (this.images.length === 0) {
      this.mode = 'no-image'
    }
  }

  toggleBetweenPreviewAndEditModes() {
    this.mode = this.mode === 'edit' ? 'preview' : 'edit'
    this.validateMode()
  }

  switchMode(mode: Mode) {
    this.mode = mode
  }

  toggleSelectionAll() {
    this.selectedImages = (this.selectedImages.length === this.images.length) ? [] : this.images.map((url, index) => index)
  }

  openImage(index) {
    this.selectedIndex = index
    this.mode = 'preview'
    this.validateMode()
  }

}