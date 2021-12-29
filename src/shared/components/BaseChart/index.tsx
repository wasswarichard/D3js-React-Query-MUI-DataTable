import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import classnames from 'classnames';
import { drawAxis, drawTooltip } from './axis';
import './index.scss';

const BaseChart = (drawChart: any, extraProps: any) => {
   function Chart(props: any) {
      const svgRef = useRef<SVGSVGElement | null>(null);
      const tooltipRef = React.createRef();
      const { axisProps, data, svgProps, tooltipClass, scaleBandPadding, ...restProps } = props;
      const { useScaleBands, findHoverData } = extraProps;
      const { margin, width, height, svgContainerClass } = svgProps;

      const xScale = d3
         .scaleBand()
         .range([0, width])
         .domain(data.map((d: { label: string }) => d.label))
         .padding(scaleBandPadding);

      const yScale = d3
         .scaleBand()
         .range([height, 0])
         .domain(data.map((d: { value: number }) => d.value))
         .padding(scaleBandPadding);

      useEffect(() => {
         flushChart();
         draw();
      });

      function flushChart() {
         d3.select(svgRef.current).selectAll('*').remove();
      }

      function draw() {
         d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

         drawAxis({
            ...axisProps,
            ...svgProps,
            ...extraProps,
            data,
            svgRef,
            xScale,
            yScale,
         });

         drawChart({
            svgRef,
            data,
            xScale,
            yScale,
            ...svgProps,
            ...restProps,
         });

         drawTooltip({
            useScaleBands,
            svgRef,
            tooltipRef,
            data,
            xScale,
            yScale,
            findHoverData,
            ...svgProps,
            ...restProps,
         });
      }

      return (
         <div className="base__container">
            <svg ref={svgRef} className={classnames('base__svg-container', svgContainerClass)} />
         </div>
      );
   }
   Chart.defaultProps = {
      scaleBandPadding: 0.05,
   };

   return Chart;
};
export default BaseChart;
