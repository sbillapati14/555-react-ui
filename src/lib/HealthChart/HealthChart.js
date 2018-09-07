import React from "react";
import * as d3 from 'd3'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    chartWrapper:{
        width: '100%'
    },
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
        this.state = {};
        this.onResizeChartRender = this.onResizeChartRender.bind(this);
    }

componentDidMount(){
    this.renderBarChart(this.props.data);
    window.addEventListener("resize", this.onResizeChartRender);
}

componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeChartRender);
}

onResizeChartRender(){
}

componentWillReceiveProps(nextProps){
  if(!this.state.rendered){
    this.renderBarChart(nextProps.data);
    this.checkComponentRender();
  }
}

checkComponentRender(){
  this.setState({isRendered: true});
  setTimeout(()=>{this.setState({isRendered: false})}, 3000)
}

renderBarChart(data){
    const {chartHeight,  chartId, classes, x_reference, y_reference, getTooltipData, onClickBar, barPadding} = this.props;
    var chartWidth = document.getElementById(chartId+"wrapper").clientWidth;
    d3.select("#" + chartId + "wrapper").selectAll("g").remove();
    var margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 0
                },
    width =  chartWidth - margin.left - margin.right,
    height = chartHeight - margin.top - margin.bottom,
    svg = d3.select(`#${chartId}`).style("width", "100%"),
    
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.2);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

        x.domain(data.map(function (d) {
                return d[x_reference];
            }));
        y.domain([0, 1]);


    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", classes.bar)
    .attr("x", function (d, i) {
        return (x(d[x_reference]));
    })
    .attr("y", function (d) {
        return 1;
    })
    .on("mousemove", onMouseMove)
    .on("mouseout", onMouseOut)
    .on("click", handleBarClick )
    .style("fill", "#fff")
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
        return height;
    })
			.transition()
			.duration(200)
			.delay(function (d, i) {
				return i * 10;
            })

    .attr("height", function (d) {
        return height - y(1);
    })
    .attr("y", function (d) {
        return y(1);
    })
    .style("fill", d => (this.props.getBarColors(d[y_reference], d3.max(data, d=> d[y_reference]))))
    
    


    d3.select("body").append("div")
         .attr("id", "myTooltip")
         .attr("class", classes.healthChartToolTip)
         .style("opacity", 0)
         .style("position", "absolute")
         .style("min-height", "20px")
         .style("font-size", "12px")
         .style("background-color", "#fff")
         .style("border", "1px solid #999")
         .style("color", "#000")
         .style("border-radius", "8px")
         .style("pointer-events", "none")
         .style("padding", "11px")
         .style("font-weight", "400")
         .style("box-shadow", "1px 1px 10px #000000")
         .style("font-family", '"Montserrat", "Helvetica", "Arial", sans-serif')

function handleBarClick(d){
   onClickBar(d);
}         

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
        const {chartId, classes} = this.props;
        return (
            <div id={chartId+"wrapper"} className={classes.chartWrapper}>
                <svg id={chartId}></svg>
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
    chartId: PropTypes.string,
    x_reference: PropTypes.string,
    y_reference: PropTypes.string,
    data: PropTypes.array,
    getBarColors: PropTypes.func,
    getTooltipData: PropTypes.func,
    onClickBar: PropTypes.func
}

Chart.defaultProps = {
    chartHeight: 120,
    chartWidth: 800,
    chartId: 'healthChart',
    x_reference: 'time_bucket',
    y_reference: 'avg',
    barPadding: 2,
    getBarColors: (value, maxValue) => '#86C35D',
    getTooltipData: (d)=> "sample tooltip",
    onClickBar: (d)=> {},
    data: [
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-03T15:40:00.000Z",
    "objectId": "5b8d56fda67fe877b20d42f9",
    "createdAt": 1535989501560,
    "updatedAt": 1535989501560,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-03T14:00:00.000Z",
    "objectId": "5b8d3f8d083db377adb55e5b",
    "createdAt": 1535983501500,
    "updatedAt": 1535983501500,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-03T12:20:00.000Z",
    "objectId": "5b8d281de75c6377a92e8c20",
    "createdAt": 1535977501598,
    "updatedAt": 1535977501598,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-03T10:40:00.000Z",
    "objectId": "5b8d10ad083db377adb55def",
    "createdAt": 1535971501471,
    "updatedAt": 1535971501471,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-03T09:00:00.000Z",
    "objectId": "5b8cf93d726c98779dfc358c",
    "createdAt": 1535965501470,
    "updatedAt": 1535965501470,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-03T07:20:00.000Z",
    "objectId": "5b8ce1cdc3e65d77a3c9bc67",
    "createdAt": 1535959501499,
    "updatedAt": 1535959501499,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-03T05:40:00.000Z",
    "objectId": "5b8cca5dcfa70977b73e08c7",
    "createdAt": 1535953501562,
    "updatedAt": 1535953501562,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-03T04:00:00.000Z",
    "objectId": "5b8cb2edc3e65d77a3c9bbfd",
    "createdAt": 1535947501568,
    "updatedAt": 1535947501568,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-03T02:20:00.000Z",
    "objectId": "5b8c9b7d083db377adb55ce5",
    "createdAt": 1535941501524,
    "updatedAt": 1535941501524,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-03T00:40:00.000Z",
    "objectId": "5b8c840d083db377adb55cb0",
    "createdAt": 1535935501565,
    "updatedAt": 1535935501565,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T23:00:00.000Z",
    "objectId": "5b8c6c9dcfa70977b73e07eb",
    "createdAt": 1535929501498,
    "updatedAt": 1535929501498,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T21:20:00.000Z",
    "objectId": "5b8c552dcfa70977b73e07b1",
    "createdAt": 1535923501555,
    "updatedAt": 1535923501555,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T19:40:00.000Z",
    "objectId": "5b8c3dbd083db377adb55c0e",
    "createdAt": 1535917501487,
    "updatedAt": 1535917501487,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T18:00:00.000Z",
    "objectId": "5b8c264d083db377adb55bd9",
    "createdAt": 1535911501477,
    "updatedAt": 1535911501477,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T16:20:00.000Z",
    "objectId": "5b8c0eddbb3bb9779e92756a",
    "createdAt": 1535905501502,
    "updatedAt": 1535905501502,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T14:40:00.000Z",
    "objectId": "5b8bf76d083db377adb55b6c",
    "createdAt": 1535899501486,
    "updatedAt": 1535899501486,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T13:00:00.000Z",
    "objectId": "5b8bdffdcfa70977b73e069b",
    "createdAt": 1535893501533,
    "updatedAt": 1535893501533,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T11:20:00.000Z",
    "objectId": "5b8bc88d726c98779dfc32c0",
    "createdAt": 1535887501498,
    "updatedAt": 1535887501498,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T09:40:00.000Z",
    "objectId": "5b8bb11da67fe877b20d3f14",
    "createdAt": 1535881501521,
    "updatedAt": 1535881501521,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T08:00:00.000Z",
    "objectId": "5b8b99ad083db377adb55a96",
    "createdAt": 1535875501490,
    "updatedAt": 1535875501490,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T06:20:00.000Z",
    "objectId": "5b8b823d726c98779dfc321d",
    "createdAt": 1535869501561,
    "updatedAt": 1535869501561,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T04:40:00.000Z",
    "objectId": "5b8b6acda67fe877b20d3e4c",
    "createdAt": 1535863501597,
    "updatedAt": 1535863501597,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T03:00:00.000Z",
    "objectId": "5b8b535dbb3bb9779e92731e",
    "createdAt": 1535857501500,
    "updatedAt": 1535857501500,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-02T01:20:00.000Z",
    "objectId": "5b8b3beda67fe877b20d3ce9",
    "createdAt": 1535851501508,
    "updatedAt": 1535851501508,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T23:40:00.000Z",
    "objectId": "5b8b247d08e1507798cf2f00",
    "createdAt": 1535845501486,
    "updatedAt": 1535845501486,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T22:00:00.000Z",
    "objectId": "5b8b0d0da67fe877b20d3b65",
    "createdAt": 1535839501543,
    "updatedAt": 1535839501543,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T20:20:00.000Z",
    "objectId": "5b8af59d726c98779dfc2e0c",
    "createdAt": 1535833501649,
    "updatedAt": 1535833501649,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T18:40:00.000Z",
    "objectId": "5b8ade2d726c98779dfc2d44",
    "createdAt": 1535827501515,
    "updatedAt": 1535827501515,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T17:00:00.000Z",
    "objectId": "5b8ac6bd08e1507798cf2bfc",
    "createdAt": 1535821501525,
    "updatedAt": 1535821501525,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T15:20:00.000Z",
    "objectId": "5b8aaf4d726c98779dfc2bc5",
    "createdAt": 1535815501493,
    "updatedAt": 1535815501493,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T13:40:00.000Z",
    "objectId": "5b8a97dd08e1507798cf2a62",
    "createdAt": 1535809501499,
    "updatedAt": 1535809501499,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T12:00:00.000Z",
    "objectId": "5b8a806d08e1507798cf2981",
    "createdAt": 1535803501497,
    "updatedAt": 1535803501497,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T10:20:00.000Z",
    "objectId": "5b8a68fd726c98779dfc2972",
    "createdAt": 1535797501532,
    "updatedAt": 1535797501532,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T08:40:00.000Z",
    "objectId": "5b8a518d08e1507798cf27ed",
    "createdAt": 1535791501612,
    "updatedAt": 1535791501612,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T07:00:00.000Z",
    "objectId": "5b8a3a1dbb3bb9779e926a02",
    "createdAt": 1535785501528,
    "updatedAt": 1535785501528,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T05:20:00.000Z",
    "objectId": "5b8a22ad726c98779dfc2733",
    "createdAt": 1535779501514,
    "updatedAt": 1535779501514,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T03:40:00.000Z",
    "objectId": "5b8a0b3dcfa70977b73dfa09",
    "createdAt": 1535773501582,
    "updatedAt": 1535773501582,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T02:00:00.000Z",
    "objectId": "5b89f3cdbb3bb9779e9267a8",
    "createdAt": 1535767501546,
    "updatedAt": 1535767501546,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-09-01T00:20:00.000Z",
    "objectId": "5b89dc5d08e1507798cf240b",
    "createdAt": 1535761501549,
    "updatedAt": 1535761501549,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T22:40:00.000Z",
    "objectId": "5b89c4ed726c98779dfc2421",
    "createdAt": 1535755501511,
    "updatedAt": 1535755501511,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T21:00:00.000Z",
    "objectId": "5b89ad7de75c6377a92e7959",
    "createdAt": 1535749501483,
    "updatedAt": 1535749501483,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T19:20:00.000Z",
    "objectId": "5b89960dbb3bb9779e92648c",
    "createdAt": 1535743501491,
    "updatedAt": 1535743501491,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T17:40:00.000Z",
    "objectId": "5b897e9d08e1507798cf20e3",
    "createdAt": 1535737501491,
    "updatedAt": 1535737501491,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T16:00:00.000Z",
    "objectId": "5b89672de75c6377a92e7707",
    "createdAt": 1535731501484,
    "updatedAt": 1535731501484,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T14:20:00.000Z",
    "objectId": "5b894fbdbb3bb9779e926226",
    "createdAt": 1535725501503,
    "updatedAt": 1535725501503,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T12:40:00.000Z",
    "objectId": "5b89384d726c98779dfc1f60",
    "createdAt": 1535719501482,
    "updatedAt": 1535719501482,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T11:00:00.000Z",
    "objectId": "5b8920dda67fe877b20d2b1a",
    "createdAt": 1535713501508,
    "updatedAt": 1535713501508,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T09:20:00.000Z",
    "objectId": "5b89096d083db377adb545e7",
    "createdAt": 1535707501511,
    "updatedAt": 1535707501511,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T07:40:00.000Z",
    "objectId": "5b88f1fd08e1507798cf1c14",
    "createdAt": 1535701501487,
    "updatedAt": 1535701501487,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T06:00:00.000Z",
    "objectId": "5b88da8d726c98779dfc1c19",
    "createdAt": 1535695501514,
    "updatedAt": 1535695501514,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T04:20:00.000Z",
    "objectId": "5b88c31d083db377adb5439a",
    "createdAt": 1535689501503,
    "updatedAt": 1535689501503,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T02:40:00.000Z",
    "objectId": "5b88abad726c98779dfc1a81",
    "createdAt": 1535683501475,
    "updatedAt": 1535683501475,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-31T01:00:00.000Z",
    "objectId": "5b88943dc3e65d77a3c9a0c5",
    "createdAt": 1535677501474,
    "updatedAt": 1535677501474,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T23:20:00.000Z",
    "objectId": "5b887ccda67fe877b20d256f",
    "createdAt": 1535671501553,
    "updatedAt": 1535671501553,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T21:40:00.000Z",
    "objectId": "5b88655de75c6377a92e6e1e",
    "createdAt": 1535665501460,
    "updatedAt": 1535665501460,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T20:00:00.000Z",
    "objectId": "5b884ded726c98779dfc1760",
    "createdAt": 1535659501409,
    "updatedAt": 1535659501409,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T18:20:00.000Z",
    "objectId": "5b88367d08e1507798cf15d6",
    "createdAt": 1535653501417,
    "updatedAt": 1535653501417,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T16:40:00.000Z",
    "objectId": "5b881f0d726c98779dfc15c8",
    "createdAt": 1535647501391,
    "updatedAt": 1535647501391,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T15:00:00.000Z",
    "objectId": "5b88079da67fe877b20d2177",
    "createdAt": 1535641501362,
    "updatedAt": 1535641501362,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T13:20:00.000Z",
    "objectId": "5b87f02dbb3bb9779e92562e",
    "createdAt": 1535635501400,
    "updatedAt": 1535635501400,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T11:40:00.000Z",
    "objectId": "5b87d8bd083db377adb53bc4",
    "createdAt": 1535629501446,
    "updatedAt": 1535629501446,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T10:00:00.000Z",
    "objectId": "5b87c14dcfa70977b73de67d",
    "createdAt": 1535623501419,
    "updatedAt": 1535623501419,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T08:20:00.000Z",
    "objectId": "5b87a9ddcfa70977b73de5a9",
    "createdAt": 1535617501418,
    "updatedAt": 1535617501418,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T06:40:00.000Z",
    "objectId": "5b87926d726c98779dfc1124",
    "createdAt": 1535611501414,
    "updatedAt": 1535611501414,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T05:00:00.000Z",
    "objectId": "5b877afdcfa70977b73de40f",
    "createdAt": 1535605501431,
    "updatedAt": 1535605501431,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T03:20:00.000Z",
    "objectId": "5b87638de75c6377a92e6559",
    "createdAt": 1535599501406,
    "updatedAt": 1535599501406,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T01:40:00.000Z",
    "objectId": "5b874c1d726c98779dfc0eb2",
    "createdAt": 1535593501440,
    "updatedAt": 1535593501440,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-30T00:00:00.000Z",
    "objectId": "5b8734ade75c6377a92e63cf",
    "createdAt": 1535587501368,
    "updatedAt": 1535587501368,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T22:20:00.000Z",
    "objectId": "5b871d3da67fe877b20d196c",
    "createdAt": 1535581501443,
    "updatedAt": 1535581501443,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T20:40:00.000Z",
    "objectId": "5b8705cd726c98779dfc0c7c",
    "createdAt": 1535575501366,
    "updatedAt": 1535575501366,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T19:00:00.000Z",
    "objectId": "5b86ee5d08e1507798cf0adc",
    "createdAt": 1535569501455,
    "updatedAt": 1535569501455,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T17:20:00.000Z",
    "objectId": "5b86d6ed726c98779dfc0aec",
    "createdAt": 1535563501377,
    "updatedAt": 1535563501377,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T15:40:00.000Z",
    "objectId": "5b86bf7da67fe877b20d1652",
    "createdAt": 1535557501453,
    "updatedAt": 1535557501453,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T14:00:00.000Z",
    "objectId": "5b86a80dbb3bb9779e924b50",
    "createdAt": 1535551501444,
    "updatedAt": 1535551501444,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T12:20:00.000Z",
    "objectId": "5b86909de75c6377a92e5e5a",
    "createdAt": 1535545501459,
    "updatedAt": 1535545501459,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T10:40:00.000Z",
    "objectId": "5b86792d083db377adb52fa2",
    "createdAt": 1535539501520,
    "updatedAt": 1535539501520,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T09:00:00.000Z",
    "objectId": "5b8661bda67fe877b20d132b",
    "createdAt": 1535533501370,
    "updatedAt": 1535533501370,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T07:20:00.000Z",
    "objectId": "5b864a4da67fe877b20d1261",
    "createdAt": 1535527501403,
    "updatedAt": 1535527501403,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T05:40:00.000Z",
    "objectId": "5b8632ddc3e65d77a3c98c14",
    "createdAt": 1535521501416,
    "updatedAt": 1535521501416,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T04:00:00.000Z",
    "objectId": "5b861b6d726c98779dfc046a",
    "createdAt": 1535515501434,
    "updatedAt": 1535515501434,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T02:20:00.000Z",
    "objectId": "5b8603fdbb3bb9779e9245b0",
    "createdAt": 1535509501339,
    "updatedAt": 1535509501339,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-29T00:40:00.000Z",
    "objectId": "5b85ec8de75c6377a92e58d2",
    "createdAt": 1535503501332,
    "updatedAt": 1535503501332,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T23:00:00.000Z",
    "objectId": "5b85d51dc3e65d77a3c98923",
    "createdAt": 1535497501427,
    "updatedAt": 1535497501427,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T21:20:00.000Z",
    "objectId": "5b85bdad726c98779dfc0142",
    "createdAt": 1535491501366,
    "updatedAt": 1535491501366,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T19:40:00.000Z",
    "objectId": "5b85a63d726c98779dfc006b",
    "createdAt": 1535485501434,
    "updatedAt": 1535485501434,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T18:00:00.000Z",
    "objectId": "5b858ecdcfa70977b73dd32e",
    "createdAt": 1535479501377,
    "updatedAt": 1535479501377,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T16:20:00.000Z",
    "objectId": "5b85775d08e1507798cefe11",
    "createdAt": 1535473501369,
    "updatedAt": 1535473501369,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T14:40:00.000Z",
    "objectId": "5b855fede75c6377a92e540a",
    "createdAt": 1535467501442,
    "updatedAt": 1535467501442,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T13:00:00.000Z",
    "objectId": "5b85487dcfa70977b73dd0b1",
    "createdAt": 1535461501417,
    "updatedAt": 1535461501417,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T11:20:00.000Z",
    "objectId": "5b85310dbb3bb9779e923e67",
    "createdAt": 1535455501399,
    "updatedAt": 1535455501399,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T09:40:00.000Z",
    "objectId": "5b85199d08e1507798cefaca",
    "createdAt": 1535449501471,
    "updatedAt": 1535449501471,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T08:00:00.000Z",
    "objectId": "5b85022dbb3bb9779e923ca9",
    "createdAt": 1535443501451,
    "updatedAt": 1535443501451,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T06:20:00.000Z",
    "objectId": "5b84eabda67fe877b20d069f",
    "createdAt": 1535437501371,
    "updatedAt": 1535437501371,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T04:40:00.000Z",
    "objectId": "5b84d34d726c98779dfbf90d",
    "createdAt": 1535431501440,
    "updatedAt": 1535431501440,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T03:00:00.000Z",
    "objectId": "5b84bbdda67fe877b20d0509",
    "createdAt": 1535425501393,
    "updatedAt": 1535425501393,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-28T01:20:00.000Z",
    "objectId": "5b84a46d726c98779dfbf77b",
    "createdAt": 1535419501352,
    "updatedAt": 1535419501352,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-27T23:40:00.000Z",
    "objectId": "5b848cfdcfa70977b73dca52",
    "createdAt": 1535413501353,
    "updatedAt": 1535413501353,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-27T22:00:00.000Z",
    "objectId": "5b84758d083db377adb51e5c",
    "createdAt": 1535407501402,
    "updatedAt": 1535407501402,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-27T20:20:00.000Z",
    "objectId": "5b845e1d08e1507798cef47a",
    "createdAt": 1535401501368,
    "updatedAt": 1535401501368,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-27T18:40:00.000Z",
    "objectId": "5b8446ad08e1507798cef3a9",
    "createdAt": 1535395501337,
    "updatedAt": 1535395501337,
    "__typename": "ServiceHealth"
  },
  {
    "env": "sdk",
    "servertype": "CRONOS",
    "avg": 0,
    "time_bucket": "2018-08-27T17:00:00.000Z",
    "objectId": "5b842f3dbb3bb9779e923573",
    "createdAt": 1535389501390,
    "updatedAt": 1535389501390,
    "__typename": "ServiceHealth"
  }
]
}