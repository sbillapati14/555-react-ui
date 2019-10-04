import React from 'react'
import * as d3 from 'd3';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  bar:{
    fill: '#3797BB',
    '&:hover': {
      fill: '#07688D'
    },
  },
  axis: {
    fill: 'none',
    stroke: '#555',
    shapeRendering: 'crispEdges',
    fontSize: '12px',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif'
  }  ,
  barChartTitle:{
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    textAlign: 'center',
    color: '#333'
  }
})

class BarChartComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={};
    }

renderChart(){
  const {data, barPadding, classes} = this.props;
  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = (this.props.chartWidth || 500) - margin.left - margin.right,
      height = (this.props.chartHeight || 500) - margin.top - margin.bottom;


  var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(barPadding);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

  x.domain(data.map(function(d) { return d.label; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  let chartId = `#${this.props.chartId}`;
  var svg = d3.select(chartId).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    svg.append("g")
      .attr("class", 'yAxis')
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("avg");

    svg.selectAll(".yAxis line")
      .attr('x2', width)
      .attr('stroke', '#eee');

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", classes.bar)
        .attr("x", function(d) { return x(d.label); })
        .attr("width", this.props.barWidth || x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })

    }

    componentDidMount(){
      this.renderChart();
    }
    render(){
      var chartToRender = document.getElementById('barChart');
      if(chartToRender){
        this.renderChart();
      }
      const {title, classes} = this.props;
        return(
          <div className={classes.barWrapper}>
            <h3 className={classes.barChartTitle}>{title}</h3>
           <div id={this.props.chartId}>

           </div>
           </div>
        )
    }
}

export default withStyles(styles)(BarChartComponent);

BarChartComponent.defaultProps = {
data : [
    {
      "label":"User 1",
      "value":10
    },
    {
      "label":"User 2",
      "value":20
    },
    {
      "label":"User 3",
      "value":30
    },
    {
      "label":"User 4",
      "value":35
    },
    {
      "label":"User 5",
      "value":26
    },
    {
      "label":"User 6",
      "value":15
    },
    {
      "label":"User 7",
      "value":8
    }
  ],
  rangeBandX: 0,
  barPadding: .2,
  title: "Bar Chart Demo"
}
