import * as d3 from 'd3';
import React, { useEffect, useRef, FC, createRef } from 'react';
import { ITransaction } from '../../types';
import classnames from 'classnames';
import { drawAxis, drawTooltip } from './axis';
import './index.scss';

interface svgProps {
   margin: {
      top: number;
      bottom: number;
      left: number;
      right: number;
   };
   width: number;
   height: number;
}
interface BarChartProps {
   svgProps: svgProps;
   axisProps: {
      xLabel: string;
      yLabel: string;
   };
   scaleBandPadding: number;
   data: ITransaction[];
   strokeWidth: number;
   useScaleBands: {
      x: boolean;
      y: boolean;
   };
}

const BarChart: FC<BarChartProps> = ({
   svgProps,
   axisProps,
   scaleBandPadding,
   data,
   useScaleBands,
   ...restProps
}) => {
   const svgRef = useRef<SVGSVGElement | null>(null);
   const tooltipRef = createRef();

   useEffect(() => {
      (() => {
         const { margin, width, height } = svgProps;
         const xScale = d3
            .scaleBand()
            .range([0, width])
            .domain(data.map((d: { label: string }) => d.label))
            .padding(scaleBandPadding);

         const yScale = d3
            .scaleBand()
            .range([height, 0])
            .domain(data.map((d) => String(d.value)))
            .padding(scaleBandPadding);
         d3.select(svgRef.current).selectAll('*').remove();

         d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

         const svg = d3.select(svgRef.current).select('g');
         const colors = d3.scaleOrdinal(['#ffa822', '#134e6f', '#ff6150', '#1ac0c6', '#dee0e6']);
         svg.selectAll('bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('fill', (d, i) => colors(String(i)))
            .attr('x', (d: { label: string }) => xScale(d.label)!)
            .attr('width', xScale.bandwidth())
            .attr('y', (d: { value: number }) => yScale(String(d.value))!)
            .attr('height', (d) => height - yScale(String(d.value))!);

         drawAxis({
            ...axisProps,
            ...svgProps,
            ...restProps,
            data,
            svgRef,
            xScale,
            yScale,
         });

         drawTooltip({
            useScaleBands,
            svgRef,
            tooltipRef,
            data,
            xScale,
            yScale,
            ...svgProps,
            ...restProps,
         });
      })();
   }, [data, axisProps, restProps, scaleBandPadding, svgProps, tooltipRef, useScaleBands]);

   return (
      <div className="base__container">
         <svg ref={svgRef} className={classnames('base__svg-container')} />
      </div>
   );
};
export default BarChart;
