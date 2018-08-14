import React from "react";
import * as d3 from 'd3'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    bar: {
        '&:hover': {
            opacity: '0.7',
          },
    },
    title:{
        fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
        textAlign: 'center'
    },
    healthChartToolTip: {
        position: 'absolute',
        textAlign: 'left',
        width: 'auto',
        height: 'auto',
        minHeight: '20px',
        font: '12px sans-serif',
        backgroundColor: '#ffffff',
        opacity: '0.1',
        border: '1px solid #999999',
        color: '#000000',
        borderRadius: '8px 8px 8px 8px',
        pointerEvents: 'none',
        padding: '11px',
        boxShadow: '1px 1px 10px #000000',
        fontSize: '12px',
        fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
        fontWeight: 400
    },
     carot: {
        position: 'absolute',
        marginLeft: '-0.5em',
        left: '53px',
        top: '100%',
        border: '0.5em solid black',
        borderColor: '#fff #fff #fff',
        transformOrigin: '0 0',
        transform: 'rotate(135deg)',
        zIndex: 9999,
     }
})

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

componentDidMount(){
    this.renderBarChart();
}

renderBarChart(){
    const {chartHeight, chartWidth, classes, data, x_reference, y_reference, getTooltipData} = this.props;
    var svg = d3.select("#healthChart").attr("width", chartWidth),
    margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 50
                },
    width =  chartWidth - margin.left - margin.right,
    height = chartHeight - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

        x.domain(data.map(function (d) {
                return d[x_reference];
            }));
        y.domain([0, d3.max(data, function (d) {
                return Number(d[y_reference]);
            })]);


    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", classes.bar)
    .attr("x", function (d) {
        return x(d[x_reference]);
    })
    .attr("y", function (d) {
        return y(d3.max(data, d=> Number(d[y_reference])));
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
        return height - y(d3.max(data, d=> Number(d[y_reference])));
    })
    .style("fill", d => (this.props.getBarColors(Number(d[y_reference]), d3.max(data, d=> Number(d[y_reference])))))
    .on("mousemove", onMouseMove)
    .on("mouseout", onMouseOut)

    d3.select("body").append("div")
         .attr("id", "myTooltip")
         .attr("class", classes.healthChartToolTip)
         .style("opacity", 0);


function onMouseMove(d){
    var tooltipDiv = d3.select("#myTooltip");

    tooltipDiv.transition()
       .duration(200)
       .style("opacity", 1);

    tooltipDiv.html(getTooltipData(d))
        .style("left", (parseFloat(d3.event.pageX) - 40) + "px")
        .style("cursor", "pointer")
        .style("top", function(d){
            return d3.event.pageY - this.offsetHeight - 17  + "px"
            })
        .style("color", "#333333")
        .append("span")
        .attr("class", classes.carot);
}

function onMouseOut(d){
    var tooltipDiv = d3.select("#myTooltip");
    tooltipDiv.transition()
          .duration(500)
          .style("opacity", 0);
}
    }


    render(){
        return (
            <div>
                <svg id="healthChart"></svg>
            </div>
        )
    }
}

export default withStyles(styles)(Chart);

/*
------------------------------------------------------------------------
1) getBarColors: is a function we need to send as a prop to the component that a user can customixe which color 
                 he want fotr the given data and logic based on data

2) getTooltipData: is a function we need to send as a props to the component that returns tooltip html data                 

*/

Chart.propTypes = {
    chartHeight: PropTypes.number,
    chartWidth: PropTypes.number,
    x_reference: PropTypes.string,
    y_reference: PropTypes.string,
    data: PropTypes.array,
    getBarColors: PropTypes.func,
    getTooltipData: PropTypes.func
}

Chart.defaultProps = {
    chartHeight: 120,
    chartWidth: 800,
    x_reference: 'time_bucket',
    y_reference: 'avg',
    data: []
}
