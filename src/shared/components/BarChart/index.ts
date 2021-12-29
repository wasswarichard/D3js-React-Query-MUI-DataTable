import BaseChart from '../BaseChart';
import * as d3 from 'd3';
import { ITransaction } from '../../types';

const drawBarChart = ({
   svgRef,
   xScale,
   yScale,
   height,
   data,
}: {
   svgRef: any;
   xScale: any;
   yScale: any;
   height: number;
   data: ITransaction[];
}) => {
   const svg = d3.select(svgRef.current).select('g');
   const colors = d3.scaleOrdinal(['#ffa822', '#134e6f', '#ff6150', '#1ac0c6', '#dee0e6']);
   svg.selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('fill', (d, i) => colors(String(i)))
      .attr('x', (d) => xScale(d.label))
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => height - yScale(d.value));
};

const extraProps = {
   useScaleBands: { x: true, y: true },
};

export default BaseChart(drawBarChart, extraProps);
