import * as d3 from 'd3'

import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'agl-pie-chart',
  template: `
    <svg #svg width='100%' height='100%'></svg>
  `
})
export class PieChartComponent implements OnChanges {

  @Input()
  data: any

  @Input()
  margin = 1

  @Input()
  radius = 10

  @ViewChild('svg')
  element: ElementRef

  @HostBinding('class')
  className = 'dib'

  ngOnChanges(changes: SimpleChanges) {
    const currentData = changes.data.currentValue
    const previousData = changes.data.previousValue
    if (currentData === undefined || currentData === previousData) {
      return
    }
    requestAnimationFrame(() => this.render(currentData))
  }

  zip(keys, row) {
    return keys.reduce((accumulator, key, index) => {
      accumulator[key] = row[index + 1]
      return accumulator
    }, {})
  }

  processData(data, keys) {
    return data
      .filter((row, index) => index !== 0)
      .map((row, index) => Object.assign({}, this.zip(keys, row), {
        label: row[0],
        total: row.reduce((total, item, i) => {
          return total + (i === 0 ? 0 : item)
        }, 0)
      }))
  }

  render(chartData) {
    const svgWidth = (this.radius + this.margin) * 2
    const svgHeight = svgWidth
    const svg = d3.select(this.element.nativeElement)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)

    svg.select('g').remove()
    const g = svg.append('g').attr('transform', 'translate(' + (svgWidth / 2) + ',' + (svgWidth / 2) + ')')
    const color = d3.scaleOrdinal().range(['primary-fi', 'accent-fi', 'info-g1-fi'])
    const data = chartData.map((d, index) => [index, d])

    const pie = d3.pie()
      .padAngle(.02)
      .sort(null)
      .value(d => {
        return d[1]
      })

    const path = d3.arc()
      .outerRadius(this.radius - this.margin)
      .innerRadius(0)

    const label = d3.arc()
      .outerRadius(this.radius - this.margin)
      .innerRadius(this.radius - this.margin)

    const arc = g.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc')

    arc.append('path')
      .attr('d', path)
      .attr('class', function (d) {
        return color(d.index)
      })

    // arc.append('text')
    //   .attr('transform', function (d) { return 'translate(' + label.centroid(d) + ')' })
    //   .attr('dy', '0.35em')
    //   .text(d => d.value)

  }
}