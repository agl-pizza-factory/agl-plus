import { Component, ContentChildren, QueryList } from '@angular/core'

import { AccordionSectionComponent } from './accordion-section.component'

@Component({
  selector: 'agl-accordion',
  template: `
    <ng-content></ng-content>
  `
})
export class AccordionComponent {
  @ContentChildren(AccordionSectionComponent)
  children: QueryList<AccordionSectionComponent>
}