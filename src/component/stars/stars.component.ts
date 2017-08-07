import { Component, HostBinding, Input, OnChanges } from '@angular/core'

@Component({
  selector: 'agl-stars',
  template: `
    <div *ngFor="let star of computedStars" [class]="star"></div>
  `
})
export class StarsComponent implements OnChanges {

  @Input()
  stars: number

  computedStars: string[]

  @HostBinding('class')
  className = 'flex'

  ngOnChanges() {
    this.computedStars = []
    for (let i = 1.0; i <= 5; i += 1.0) {
      this.computedStars.push((i - 1) < this.stars && i > this.stars ? 'ion-ios-star-half accent-text' :
        i <= this.stars ? 'ion-ios-star accent-text' : 'ion-ios-star-outline')
    }
  }

}