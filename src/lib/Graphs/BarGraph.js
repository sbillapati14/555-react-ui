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
  const {data, rangeBandX, barSpacingFactor, classes} = this.props;
  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = (this.props.chartWidth || 500) - margin.left - margin.right,
      height = (this.props.chartHeight || 500) - margin.top - margin.bottom;
  
  var formatPercent = d3.format(".0%");
  
  var x = d3.scale.ordinal()
      .rangeRoundBands([rangeBandX, width], barSpacingFactor);
  
  var y = d3.scale.linear()
      .range([height, 0]);
  
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
  
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      // .tickFormat(formatPercent);

  
  x.domain(data.map(function(d) { return d.label; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]); 
  
  let chartId = `#${this.props.chartId}`;
  var svg = d3.select(chartId).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        // .attr("class", "x axis")
        .attr("class", classes.axis)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
  
    svg.append("g")
        // .attr("class", "y axis")
        .attr("class", classes.axis)
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("value");
  
        // var barWidth = this.props.barWidth || x.rangeBand();
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", classes.bar)
        .attr("x", function(d) { return x(d.label); })
        .attr("width", x.rangeBand())
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
  barSpacingFactor: .2,
  title: "Bar Chart Demo"
}