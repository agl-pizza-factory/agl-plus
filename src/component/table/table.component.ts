import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'

export type ColumnType = 'string' | 'number' | 'amount' | 'percent' | 'boolean' | 'checkmark' | 'checkbox' |
  'date' | 'date:descriptive' | 'date:relative' | 'numberinput'

export interface CheckBoxCheckEvent {
  rowIndex?: number
  checked?: boolean
}

export interface QuantityChangeEvent {
  rowIndex?: number
  value?: number
}

export interface Column {
  name?: string
  sortable?: boolean
  selectable?: boolean
  type?: ColumnType,
  className?: string
}

export interface CellClickEvent {
  rowIndex: number
  colIndex: number
  row: any[]
  column: Column
  data: any
}
export interface PageClickEvent {
  pageNumber: number
  action: string
}

export interface RowClickEvent {
  rowIndex: number
  row: any[]
}

@Component({
  selector: 'agl-table',
  template: `
    <table class="card collapse f5 tl shadow-1 ba divider-br">

      <tr *ngIf="showHeader">
        <td [class]="column?.className + ' tr primary pv4 ph4-l ph3-m ph2 ttu nowrap '" *ngIf="showRowNumber">#</td>
        <td *ngFor="let column of (columns || []); let colIndex = index"
          [class]="column?.className + ' primary pv4 ph4-l ph3-m ph2 ttu nowrap ' + (column?.sortable ? 'pointer' : '')"
          (click)="sort(colIndex, column != null && column.sortable)">
          {{column?.name}}
          <span [class]="sortIcons[sortState[colIndex]] + ' ml1'" *ngIf="column?.sortable"></span>
        </td>
      </tr>

      <tr *ngFor="let row of (sortedRows || []); let rowI = index"
        class="bb divider-br"
        [class.striped--near-white]="stripe"
        [class.accent--hover]="selectableRow && highlightSelection" [class.pointer]="selectableRow"
        (click)="onRowClick($event, rowI, selectableRow)">

        <td [class]="column?.className + ' tr pv3 ph4-l ph3-m ph2 nowrap '" *ngIf="showRowNumber">{{rowI + 1}}</td>

        <td *ngFor="let column of (columns || []); let i = index"
          [class]="getCellClass(i)"
          (click)="onCellClick($event, rowI, i, column.selectable)">
          <span [ngSwitch]="column?.type" [class.primary-text]="column.selectable">
            <span *ngSwitchCase="'number'">{{row[i] | formatNumber}}</span>
            <span *ngSwitchCase="'percent'">{{row[i] ? (row[i]/100 | formatNumber:'0%') : ''}}</span>
            <span *ngSwitchCase="'amount'">{{row[i] | formatAmount}}</span>
            <span *ngSwitchCase="'checkbox'" class="flex justify-center">
              <md-checkbox [disabled]="!column.selectable" [checked]="row[i]" (change)="onChecked(rowI,$event.checked)"></md-checkbox>
            </span>
            <span *ngSwitchCase="'numberinput'" class="justify-start">

                  <input type="number" name="quantity" min="1" [disabled]="!row[i] || rowDisabled" [value]="row[i]" class="card br2"
                  (change)="onQuantityChange(rowI,$event)">

            </span>
            <span *ngSwitchCase="'boolean'" class="flex justify-center">
              {{row[i] ? 'YES' : 'NO'}}
            </span>
            <span *ngSwitchCase="'checkmark'" class="flex justify-center f4">
              <span [class.ion-ios-checkmark-circle]="row[i]" [class.success-text]="row[i]"
                [class.ion-ios-close-circle]="!row[i]" [class.error-text]="!row[i]" ></span>
            </span>
            <span *ngSwitchCase="'date'">{{row[i] | formatDate}}</span>
            <span *ngSwitchCase="'date:relative'">{{row[i] | formatDate:'relative'}}</span>
            <span *ngSwitchCase="'date:descriptive'">{{row[i] | formatDate:'descriptive'}}</span>
            <span *ngSwitchDefault>{{row[i]}}</span>
          </span>
        </td>
      </tr>

      <tr *ngIf="loading">
        <td [colSpan]="columns.length + (showRowNumber ? 1 : 0)">
          <div class="flex justify-center">
            <md-spinner color="accent" [style.width]="'50px'"></md-spinner>
          </div>
        </td>
      </tr>

    </table>

    <div class="flex justify-center ma4" *ngIf="!loading && (hasMore || maxRowIndex < (rows || []).length)">
      <agl-button [small]="true" icon="ion-ios-arrow-dropdown-circle"
        (click)="loadMore()">Load More...</agl-button>
    </div>

  `
})
export class TableComponent implements OnChanges {

  @Input()
  rows: any[][]

  @Input()
  columns: Column[]

  @Input()
  showRowNumber = false

  @Input()
  showHeader = true

  @Input()
  stripe = true

  @Input()
  selectableRow = true

  @Input()
  paginated = true

  @Input()
  itemCountPerPage

  @Input()
  highlightSelection = true

  @Input()
  loading: boolean

  @Input()
  hasMore: boolean

  @Input()
  sortBy

  @Input()
  descendingSort: boolean

  @Input()
  maxRowCount: boolean

  @Input()
  pages: number[]

  @Input()
  clientSort = false

  @Input()
  pageselected: boolean[]

  @Input()
  pageshown: boolean[]

  @Input()
  selectedPage: number

  @Input()
  showPreviousPageCheck = true

  @Input()
  showNextPageCheck = false

  @Input()
  disabled: boolean[]

  @Input()
  rowDisabled = false

  @Output()
  rowClick: EventEmitter<RowClickEvent> = new EventEmitter<RowClickEvent>()

  @Output()
  cellClick: EventEmitter<CellClickEvent> = new EventEmitter<CellClickEvent>()

  @Output()
  more: EventEmitter<number> = new EventEmitter<number>()

  @Output()
  sortCriteria: EventEmitter<number[]> = new EventEmitter<number[]>()

  @Output()
  pageClicked: EventEmitter<PageClickEvent> = new EventEmitter<PageClickEvent>()

  @Output()
  checkBoxClick: EventEmitter<CheckBoxCheckEvent> = new EventEmitter<CheckBoxCheckEvent>()

  @Output()
  quantityChangeEvent: EventEmitter<QuantityChangeEvent> = new EventEmitter<QuantityChangeEvent>()

  sortedRows: any[][]
  maxRowIndex: number

  sortState = []
  sortIcons = ['ion-ios-arrow-dropup', 'ion-ios-arrow-dropup-circle', 'ion-ios-arrow-dropdown-circle']

  ngOnChanges(changes: SimpleChanges) {
    this.maxRowIndex = Math.min(this.itemCountPerPage || 10, (this.rows || []).length)
    if (changes.columns != null) {
      this.sortState = this.columns.map((c, i) => {
        return i === this.sortBy ? (this.descendingSort ? 2 : 1) : (this.sortState && this.sortState[i] || 0)
      })
      this.sortRows('OnChange')
    }
    this.sortRows('OnChange')
  }

  sort(index, sortable) {
    if (!sortable) { return }
    this.sortState = this.sortState.map((c, i) => i === index ? c : 0)
    this.sortState[index]++
    if (this.sortState[index] > 2) {
      this.sortState[index] = 0
    }
    this.sortRows('Header')
  }

  onRowClick(event, rowIndex, selectable) {
    if (!selectable) { return }
    event.stopPropagation()
    this.rowClick.emit({
      rowIndex,
      row: this.rows[rowIndex]
    })
  }

  onCellClick(event, rowIndex, colIndex, selectable) {
    if (!selectable) { return }
    event.stopPropagation()
    this.cellClick.emit({
      rowIndex,
      colIndex,
      column: this.columns[colIndex],
      row: this.rows[rowIndex],
      data: this.rows[rowIndex][colIndex]
    })
  }

  getCellClass(index) {
    const column = this.columns[index]
    let className = `pv3 ph4-l ph3-m ph2`
    className += ` ${column.className}`
    className += ` ${column.selectable ? (this.highlightSelection ? 'accent--hover' : '') + ' pointer' : ''}`
    className += ` ${/number|amount|percent/.test(column.type) ? 'tr' : 'tl'}`
    return className
  }

  loadMore() {
    if (this.maxRowIndex > (this.rows || []).length) {
      this.more.emit((this.rows || []).length)
      return
    }
    this.loading = true
    setTimeout(() => {
      this.maxRowIndex += (this.itemCountPerPage || 10)
      this.more.emit(this.maxRowIndex)
      this.sortRows('loadMore')
      this.loading = false
    }, 1000)
  }

  sortRows(origin: string) {

    if (this.rows == null || this.columns == null) { return }

    // clone rows
    this.sortedRows = (this.rows || []).slice(0, this.maxRowIndex)

    // calculate index of column to be sorted and order
    let sortIndex
    const sortOrder = this.sortState.find((order, index) => {
      if (order !== 0) {
        sortIndex = index
        return true
      }
      return false
    })

    if (sortIndex == null) { return }

    // do the sort
    if (this.clientSort) {
      this.sortedRows.sort((a: any, b: any) => {
        if (/^date.*/.test(this.columns[sortIndex].type)) {
          a = new Date(a[sortIndex])
          b = new Date(b[sortIndex])
        } else {
          a = a[sortIndex]
          b = b[sortIndex]
        }
        // this.sortCriteria.emit([sortIndex, sortOrder])
        return (a > b ? 1 : a < b ? -1 : 0) * (sortOrder === 1 ? 1 : -1)
      })
    }
  }

  onPageClick(e) {
    this.pageselected.fill(false)
    this.pageselected[e] = true
    this.selectedPage = e
    this.pageClicked.emit({
      pageNumber: this.selectedPage,
      action: ''
    })
  }

  showNextPage() {
    if (this.selectedPage >= 10) {
      this.showPreviousPageCheck = false
    }
    this.selectedPage = this.selectedPage + 1
    this.pageselected.fill(false)
    this.pageselected[this.selectedPage] = true
    this.pageshown[this.selectedPage] = false
    if (this.selectedPage > 10) {
      this.pageshown[this.selectedPage - 10] = true
    }
    if (this.pageshown[this.pageshown.length - 1] === false) {
      this.showNextPageCheck = true
    }
    this.pageClicked.emit({
      pageNumber: this.selectedPage,
      action: 'Next'
    })
  }

  showPreviousPage() {
    this.selectedPage = this.selectedPage - 1
    this.pageselected.fill(false)
    this.pageselected[this.selectedPage] = true
    if (this.selectedPage < this.pageshown.indexOf(false)) {
      this.showNextPageCheck = false
      this.pageshown[this.selectedPage] = false
      this.pageshown[this.selectedPage + 10] = true
    }
    if (this.pageshown[1] === false) {
      this.showPreviousPageCheck = true
    }
    this.pageClicked.emit({
      pageNumber: this.selectedPage,
      action: 'Previous'
    })
  }

  onChecked(rowIndex, checked) {
    this.checkBoxClick.emit({ rowIndex, checked })
  }

  onQuantityChange(rowIndex, event) {
    const value = Number(event.srcElement.value)
    this.quantityChangeEvent.emit({
      rowIndex,
      value
    })
  }

}