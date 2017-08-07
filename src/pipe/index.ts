import { AmountFormatterPipe } from './format-amount.pipe'
import { DateFormatterPipe } from './format-date.pipe'
import { DoubleFormatterPipe } from './format-double.pipe'
import { NumberFormatterPipe } from './format-number.pipe'

export const PIPES = [
  AmountFormatterPipe,
  DateFormatterPipe,
  NumberFormatterPipe,
  DoubleFormatterPipe
]