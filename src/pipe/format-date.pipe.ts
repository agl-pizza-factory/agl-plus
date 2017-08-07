import * as moment from 'moment'

import { Pipe, PipeTransform } from '@angular/core'

export type DateFormat = 'normal' | 'relative' | 'descriptive'

@Pipe({ name: 'formatDate' })
export class DateFormatterPipe implements PipeTransform {

  transform(date: string, format?: DateFormat): string {
    if (date == null) { return '' }
    switch (format) {
      case 'relative': return moment(date).fromNow()
      case 'descriptive': return moment(date).calendar(null, {
        lastDay: '[Yesterday at] LT',
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        lastWeek: '[last] dddd [at] LT',
        nextWeek: 'dddd [at] LT',
        sameElse: 'LLL'
      })
      case 'normal':
      default: return moment(date).format('DD MMMM YYYY')
    }
  }

}
