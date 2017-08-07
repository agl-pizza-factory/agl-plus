import * as numeral from 'numeral'

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'formatAmount'})
export class AmountFormatterPipe implements PipeTransform {

  transform(amount: string, format?: string): string {
   return numeral(amount).format(format || `$ 0,0.00`)
  }

}
