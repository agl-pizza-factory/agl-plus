import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'agl-image',
  template: `
    <img #img [src]="source" (error)="onError()" [class]="className"/>
  `
})
export class ImageComponent {

  @Input()
  source: string

  @Input()
  fallback: string

  @Input()
  className: string

  @Output()
  click: EventEmitter<Event> = new EventEmitter<Event>()

  @ViewChild('img')
  img: ElementRef

  fallbackImageSet = false

  onError() {
    if (this.fallbackImageSet === true || this.img.nativeElement.src === this.fallback) {
      return
    }
    if (this.fallback == null) {
      this.img.nativeElement.style.opacity = 0
    } else {
      this.img.nativeElement.src = this.fallback
    }
    this.fallbackImageSet = true
  }

}