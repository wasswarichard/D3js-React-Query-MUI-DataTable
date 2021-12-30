import * as d3 from 'd3';
import classnames from 'classnames';

export const drawAxis = (config: any) => {
   const {
      margin,
      width,
      height,
      svgRef,
      drawYGridLines,
      drawXGridlines,
      gridClass,
      xScale,
      yScale,
      xLabel,
      yLabel,
      axisClass,
   } = config;
   const svg = d3.select(svgRef.current).select('g');
   if (drawYGridLines) {
      svg.append('g')
         .attr('class', classnames(['base__gridlines gridlines__y', gridClass]))
         .attr('transform', `translate(0,${height})`)
         .call(
            d3
               .axisBottom(xScale)
               .tickSize(-height)
               .tickFormat((d) => `$ ${d}`)
         );
   }
   if (drawXGridlines) {
      svg.append('g')
         .attr('class', classnames(['base__gridlines gridlines__x', gridClass]))
         .call(d3.axisLeft(yScale).tickSize(-width));
   }

   svg.append('g')
      .attr('class', classnames(['base__axis axis__x', axisClass]))
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

   svg.append('g')
      .attr('class', classnames(['base__axis axis__y', axisClass]))
      .call(d3.axisLeft(yScale));

   if (xLabel) {
      svg.append('text')
         .attr('class', 'base__axis-label axis__x-label')
         .attr('text-anchor', 'middle')
         .attr('x', width / 2)
         .attr('y', height + margin.top / 2)
         .text(xLabel);
   }

   if (yLabel) {
      svg.append('text')
         .attr('class', 'base__axis-label axis__y-label')
         .attr('text-anchor', 'middle')
         .attr('x', -height / 2)
         .attr('y', -margin.left / 2)
         .attr('transform', 'rotate(-90)')
         .text(yLabel);
   }
};

export const drawTooltip = (config: any) => {
   const { useScaleBands, width, height, svgRef, tooltipRef, markerClass } = config;

   const svg = d3.select(svgRef.current).select('g');
   const tooltip = d3.select(tooltipRef.current);

   const focus = svg.append('g').attr('class', 'focus').style('display', 'none');

   focus
      .append('circle')
      .attr('r', 5)
      .attr('class', classnames(['line-chart__circle', markerClass]));

   if (useScaleBands) focus.style('visibility', 'hidden');

   svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .style('opacity', 0)
      .on('mouseover', () => {
         focus.style('display', null);
      })
      .on('mouseout', () => {
         focus.style('opacity', 0);
         tooltip.transition().duration(300).style('opacity', 0);
      });
};
