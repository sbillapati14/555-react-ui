import React from 'react'
import * as d3 from 'd3';
import { withStyles } from '@material-ui/core/styles';

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
        // this.addLine = this.addLine.bind(this);
    }

    // addLine(data) {

    //   var lineFun = d3.svg.line()
    //                 .x(function(d) {} )
    //                 .y(function(d) {} )
    //                 .interpolate("linear")

    //   var svg = d3.select("body").append("svg").attr({width:600, height: 400})

    //   var viz = svg.append("path")
    //                .attr({
    //                   d: lineFun(data.values),
    //                   "stroke": "black",
    //                   "stroke-width": 2,
    //                   "fill": "none"
    //                })

    // }

    renderChart(){
      const {data, linePadding, classes} = this.props;
      var margin = {top: 40, right: 20, bottom: 30, left: 40},
          width = (this.props.chartWidth || 500) - margin.left - margin.right,
          height = (this.props.chartHeight || 500) - margin.top - margin.bottom;
      
      
      var x = d3.scaleBand()
                .rangeRound([0, width])
                .padding(linePadding);

      var y = d3.scaleLinear()
                .rangeRound([height, 0]);
      
      x.domain(data.map(function(d) { return d.label; }));
      y.domain([0, d3.max(data, function(d) { return d.value; })]); 
      
      let chartId = `#${this.props.chartId}`;

      var percentiles = data.map(function(id) {
        return {
          key: id,
          values: data.map(function(d) {
            return {x: d.x, y: d.y};
          })
        };
      });

      var svg = d3.select(chartId).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x))

      var yAxis = svg.append("g")
                     .attr("class", 'yAxis')
                     .call(d3.axisLeft(y))
                     .append("text")
                     .attr("fill", "#000")
                     .attr("transform", "rotate(-90)")
                     .attr("y", 6)
                     .attr("dy", "0.71em")
                     .attr("text-anchor", "end")
                     .text("avg");

      // svg.selectAll(".line")
      //     .data(data)
      //     .enter().append("rect")
      //     .attr("class", classes.line)
      //     .attr("x", function(d) { return x(d.values.x); })
      //     .attr("y", function(d) { return y(d.values.y); })
      //     .attr("height", function(d) { return height - y(d.y); })

      data.forEach( function(d) {
        console.log("Single Line Data: " + JSON.stringify(d))
        var lineFun = d3.line()
                      .x(function(d) {console.log("x: " + d.x); return d.x} )
                      .y(function(d) {console.log("y: " + d.y); return d.y} )
                      .curve(d3.curveBasis)

        svg.append("path")
           .attr({
              d: lineFun(data.values),
              "stroke": "black",
              "stroke-width": 2,
              "fill": "none"
           })
      })

    }

    componentDidMount() {
      this.renderChart();
    }
    render() {
      var chartToRender = document.getElementById('barChart');
      if(chartToRender) {
        this.renderChart();
      }
      const {title, classes} = this.props;
      return(
        <div className={classes.lineWrapper}>
          <h3 className={classes.lineChartTitle}>{title}</h3>
          <div id={this.props.chartId}>
              
          </div>
        </div>
      )
    }
}

export default withStyles(styles)(LineChartComponent);

LineChartComponent.defaultProps = {
data : [
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
  linePadding: .2,
  title: "Line Chart Demo"
}