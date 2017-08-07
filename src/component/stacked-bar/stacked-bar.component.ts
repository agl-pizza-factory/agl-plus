import * as d3 from 'd3'

import { Component, ElementRef, HostBinding, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core'

@Component({
  selector: 'agl-stacked-bar',
  template: `
    <div>{{title}}</div>
    <div class="relative flex justify-center h-100">
      <svg #svg width="100%" height="100%"></svg>
    </div>
  `
})
export class StackedBarComponent implements OnChanges {

  @Input()
  data: any

  @Input()
  unit: string

  @Input()
  title: string

  @Input()
  sort: boolean

  @Input()
  spacing = 13

  @Input()
  showXAxis = true

  @Input()
  showYAxis = true

  @ViewChild('svg')
  element: ElementRef

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
    const svgWidth = 715 * 1.2
    const svgHeight = 350 * 1.2
    const svg = d3.select(this.element.nativeElement)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)

    svg.select('g').remove()

    const margin = { top: 20, right: 20, bottom: 70, left: 40 },
      width = svgWidth - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom,

      g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1)

    const y = d3.scaleLinear()
      .rangeRound([height, 0])

    const z = d3.scaleOrdinal().range(['primary-fi', 'accent-fi'])

    const keys = [].concat(chartData[0].slice(1))
    const data = this.processData(chartData, keys)

    if (this.sort) {
      data.sort((a, b) => b.total - a.total)
    }

    x.domain(data.map(row => row.label))
    y.domain([0, d3.max(data, d => d.total)]).nice()
    z.domain(keys)

    g.selectAll('g')
      .data(d3.stack().keys(keys)(data))
      .enter().append('g')
      .attr('class', d => z(d.key))
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', d => x(d.data.label) + this.spacing / 2)
      .attr('width', x.bandwidth() - this.spacing)
      .attr('y', height)
      .attr('height', 0)
      .transition()
      .duration((d, i) => 500 + i * 100)
      .ease(d3.easeExpOut)
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('y', d => y(d[1]))

    if (this.showXAxis) {
      g.append('g')
        .attr('class', 'ff1 f7')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
    }

    if (this.showYAxis) {
      g.append('g')
        .attr('class', 'ff1 f7')
        .call(d3.axisLeft(y).ticks(null, 's'))
        .append('text')
        .attr('x', 2)
        .attr('y', y(y.ticks().pop()) + 0.5)
        .attr('dy', '0.32em')
        .attr('text-anchor', 'start')
        .text(this.unit)
    }

    const legend = g.append('g')
      .attr('class', 'ff1 f6')
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(keys.slice().reverse())
      .enter().append('g')
      .attr('transform', (d, i) => `translate(${i * -140 - margin.right}, ${height + 40})`)

    legend.append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('class', z)

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d)

  }
}