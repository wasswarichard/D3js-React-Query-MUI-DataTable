import * as d3 from 'd3';
import './index.scss';
import { useEffect, useRef, FC } from 'react';
import classnames from 'classnames';
interface PieChartData {
   label: string;
   value: number;
}
interface PieChartProps {
   data: PieChartData[];
   setSelectedPieChartArea: (value: string) => void;
}

const PieChart: FC<PieChartProps> = ({ data, setSelectedPieChartArea }) => {
   const pieChart = useRef<SVGSVGElement | null>(null);

   useEffect(() => {
      (() => {
         const colors = d3.scaleOrdinal(['#6b3669', '#990b48']);
         const pieChartData = d3.pie<PieChartData>().value((d) => d.value)(data);
         const segments = d3
            .arc<any>()
            .innerRadius(0)
            .outerRadius(100)
            .padAngle(0.05)
            .padRadius(50);

         const svg = d3
            .select(pieChart.current)
            .attr('width', 200)
            .attr('height', 200)
            .style('margin-top', '25px')
            .append('g')
            .attr('transform', 'translate(100, 100)');

         svg.selectAll('path')
            .data(pieChartData)
            .enter()
            .append('path')
            .attr('d', segments)
            .style('cursor', 'pointer')
            .on('click', (d, i) => {
               setSelectedPieChartArea(i.data.label);
            })
            .attr('fill', (d, i) => colors(String(d.data.value)));

         svg.selectAll()
            .data(pieChartData)
            .join('text')
            .text((d) => (d.data.value > 0 ? `${d.data.label} : ${d.data.value}` : ''))
            .attr('transform', (d) => `translate(${segments.centroid(d)})`)
            .style('text-anchor', 'middle');
      })();
   }, [data, setSelectedPieChartArea]);

   if (
      data.length === 0 ||
      data
         .map((transaction: PieChartData) => transaction.value)
         .reduce((previousValue, currentValue) => previousValue + currentValue, 0) === 0
   ) {
      return (
         <div id="chartArea" className="container base__container no_data">
            <p> No Data </p>
         </div>
      );
   }

   return (
      <div id="chartArea" className="container base__container">
         <svg ref={pieChart} className={classnames('pie_chart_svg')} />
      </div>
   );
};
export default PieChart;
