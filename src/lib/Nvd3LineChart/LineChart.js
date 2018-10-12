import React from 'react'
import * as d3 from 'd3';
import { withStyles } from '@material-ui/core/styles';
import NVD3Chart from 'react-nvd3'

const styles = theme => ({
  line:{
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
  lineChartTitle:{
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    textAlign: 'center',
    color: '#333'
  }
})

class LineChartComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={};
        this.renderChart = this.renderChart.bind(this);
    }

renderChart(){

  const {data, yAxisLabel,  classes} = this.props;

  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = (this.props.chartWidth || 500) - margin.left - margin.right,
      height = (this.props.chartHeight || 500) - margin.top - margin.bottom;
  
  var chartConfig = {
        "chart": {
          "type": "lineChart",
          "height": 450,
          "margin": {
            "top": 20,
            "right": 20,
            "bottom": 80,
            "left": 70
          },
          "x": function (d){ return d.x;},
          "y": function (d){ return d.y;},
          // "forceY": [ 0 ],
          "useInteractiveGuideline": true,
          "clipEdge": false,
          "stacked": true,
          "showControls": false,
          "dispatch": {},
          "xAxis": {
            "axisLabel": "Time",
            "rotateYLabel": true,
            "rotateLabels": -50,
            "margin": {
              "top": 0,
              "right": 0,
              "bottom": 0,
              "left": 0
              },
            "orient": "bottom",
            "tickValues": null,
            "tickSize": 6,
            "tickPadding": 7,
            // "tickFormat": function (d) { return d3.time.format('%m/%d/%y %H:%M')(new Date(d)) },
            "tickSubdivide": 24
          },
          "yAxis": {
            "axisLabel": "ms",
            "tickFormat": function (d){ return d3.format(',.0f')(d); }
          },
          "tooltip": {
            "duration": 0,
            "gravity": "w",
            "distance": 25,
            "snapDistance": 0,
            "classes": null,
            "chartContainer": null,
            "enabled": true,
            "hideDelay": 200,
            // valueFormatter: function (d, i) { return yAxis.tickFormat()(d, i); },
            valueFormatter: function (d, i) { var label = d3.format(',.4f')(d) + "%"; return label; },
            // headerFormatter: function (d, i) { return xAxis.tickFormat()(d, i); },
            keyFormatter: function (d, i) { return d3.format(',.000f')(d); },
            "headerEnabled": true,
            "fixedTop": null,
            "hidden": false,
            "data": null
          },
          "interactiveLayer": {
            "dispatch": {},
            "tooltip": {
              "duration": 0,
              "gravity": "w",
              "distance": 25,
              "snapDistance": 0,
              "classes": null,
              "chartContainer": null,
              "enabled": true,
              "hideDelay": 0,
              // valueFormatter: function (d, i) { return d3.format(',.3f')(d, i); },
              valueFormatter: function (d, i) { var label = d3.format(',.3f')(d) + "%"; return label; },
              // headerFormatter: function (d, i) { return d3.time.format('%m/%d/%y %H:%M')(new Date(d)); },
              keyFormatter: function (d, i) { return d; },
              "headerEnabled": true,
              "fixedTop": null,
              "hidden": false,
              "data": null
            },
            "margin": {
              "left": 0,
              "top": 0
            },
            "width": null,
            "height": null,
            "showGuideLine": true,
            "svgContainer": null
          },
          "clipEdge": false,
          "showXAxis": true,
          "yTickFormat": function (d){ var label = d3.format(',.1f')(d) + "%"; return label; },
          "transitionDuration": 250
        },
        "title": {
          "enable": false
        }
      }


  return (
            <NVD3Chart type="lineChart" datum={data} x="x" y="y.fixed(2)" /> 
  )  

//                              <nvd3 options="gateAarErrorRateOptions" data="aarErrorRateChartData" config="gateRateConfig"></nvd3>

//   var x = d3.scaleBand()
//     .rangeRound([0, width]);

//   var y = d3.scaleLinear()
//     .rangeRound([height, 0]);
  
//   x.domain(data.map(function(d) { return d.x; }));
//   y.domain([0, d3.max(data, function(d) { return d.y; })]); 
  
//   let chartId = `#${this.props.chartId}`;
//   var svg = d3.select(chartId).append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))

//       // var xScale = d3.scale.ordinal()
//       //     .domain(xDomain ? xDomain.call(this) : data.map(function(d){ return d[0]; }))
//       //     .rangeBands([0, width - margin.left - margin.right], padding);

//       // var yScale = d3.scale.linear()
//       //     .domain(yDomain ? yDomain.call(this) : [0, d3.max(data, function(d){ return 1.1*(d[1]); })])
//       //     .range([height - margin.top - margin.bottom, 0]);

//     var yAxis = svg.append("g")
//                   .attr("class", 'yAxis')
//                   .call(d3.axisLeft(y))
//                   .append("text")
//                   .attr("fill", "#000")
//                   .attr("transform", "rotate(-90)")
//                   .attr("y", 6)
//                   .attr("dy", "0.71em")
//                   .attr("text-anchor", "end")
//                   .text("avg");

//     // var xAxis = svg.axis()
//     //               .scale(xScale)
//     //               .orient("bottom")
//     //               .tickSize(6, 0);


// svg.line = d3.line()
//     .defined(d => !isNaN(d.y))
//     .x(d => x(d.x))
//     .y(d => y(d.y))

//     svg.selectAll(".yAxis line")
//       .attr('x2', width)
//       .attr('stroke', '#eee');

//     svg.selectAll(".line")
//       .data(data)
//       .enter().append("rect")
//       .attr("class", classes.line)
//       .attr("x", function(d) { return x(d.label); })
//       .attr("width", this.props.barWidth || x.bandwidth())
//       .attr("y", function(d) { return y(d.value); })
//       .attr("height", function(d) { return height - y(d.value); })

    }

    componentDidMount(){
      this.renderChart();
    }
    render(){
      var chartToRender = document.getElementById('lineChart');
      if(chartToRender){
        this.renderChart();
      }
      const {title, classes} = this.props;
        return(
          <div className={classes.lineWrapper}>
            <h3 className={classes.lineChartTitle}>{title}</h3>
            <div id={this.props.chartId}>
              {this.renderChart()}
            </div>
          </div>
        )
    }
}

export default withStyles(styles)(LineChartComponent);

LineChartComponent.defaultProps = {
data :[
    {
      "key":"P50",
      "values":[
        {"x":1537911060000,"y":23.29838575470128},
        {"x":1537911960000,"y":19.00990099009901},
        {"x":1537912860000,"y":18.22164142018369},
        {"x":1537913760000,"y":35.797058216113264},
        {"x":1537914660000,"y":15.73016323267748},
        {"x":1537915560000,"y":16.23712101083459},
        {"x":1537916460000,"y":10.190909708539982},
        {"x":1537917360000,"y":10.492261956806856},
        {"x":1537918260000,"y":18.194202601659326},
        {"x":1537919160000,"y":22.406981543723098}
      ]
    },
    {
      "key":"P95",
      "values":[
        {"x":1537911060000,"y":19.807936796222303},
        {"x":1537911960000,"y":19.19871851498501},
        {"x":1537912860000,"y":20.731259377315148},
        {"x":1537913760000,"y":24.415016211570764},
        {"x":1537914660000,"y":20.50738335553804},
        {"x":1537915560000,"y":18.83781747262976},
        {"x":1537916460000,"y":22.679757393083783},
        {"x":1537917360000,"y":22.916850295274802},
        {"x":1537918260000,"y":23.464633629817874},
        {"x":1537919160000,"y":20.752883074579032}
      ]
    },
    {
      "key":"P99",
      "values":[
        {"x":1537911060000,"y":21.765822078356958},
        {"x":1537911960000,"y":17.574194279883218},
        {"x":1537912860000,"y":35.073597056117756},
        {"x":1537913760000,"y":33.12923359067649},
        {"x":1537914660000,"y":29.64728895409255},
        {"x":1537915560000,"y":27.28428363253031},
        {"x":1537916460000,"y":21.292415844261187},
        {"x":1537917360000,"y":28.843786274578775},
        {"x":1537918260000,"y":27.326610730505735},
        {"x":1537919160000,"y":28.99177845088706}
      ]
    }
  ],
  rangeBandX: 0,
  yAxisLabel: "ms",
  title: "Line Chart Demo"
}