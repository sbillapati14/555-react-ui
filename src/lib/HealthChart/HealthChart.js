import React from "react";
import * as d3 from 'd3'
import { withStyles } from '@material-ui/core/styles';

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
        fontWeight: '600',
        borderRadius: '8px 8px 8px 8px',
        pointerEvents: 'none',
        padding: '11px',
        boxShadow: '1px 1px 10px #000000',
        fontSize: '12px',
        fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
        fontWeight: 400
    },

    toolTipAfter:{
        content: "",
        position: 'absolute',
        top: '100%',
        left: '50%',
        marginLeft: '-5px',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: '#ffffff transparent transparent transparent'
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

getBarColors(currentSize, maxSize){
    let barPercent = currentSize*100/maxSize;
    if(barPercent <= 30){
        return '#DC2620'
    }
    else if(barPercent <= 70){
        return '#FF9E00'
    }
    else{
        return '#86C35D'
    }
}

    renderBarChart(){
        const {chartHeight, chartWidth, classes, data} = this.props;
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

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);


    x.domain(data.map(function (d) {
            return d.time_bucket;
        }));
    y.domain([0, d3.max(data, function (d) {
            return Number(d.avg);
        })]);

	// g.append("g")
	// .attr("transform", "translate(0," + height + ")")
	// .call(d3.axisBottom(x))

	// g.append("g")
	// .call(d3.axisLeft(y))
	// .append("text")
	// .attr("fill", "#000")
	// .attr("transform", "rotate(-90)")
	// .attr("y", 6)
	// .attr("dy", "0.71em")
	// .attr("text-anchor", "end")
	// .text("avg");

    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", classes.bar)
    .attr("x", function (d) {
        return x(d.time_bucket);
    })
    .attr("y", function (d) {
        return y(Number(d.avg));
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
        return height - y(Number(d.avg));
    })
.style("fill", d => (this.getBarColors(Number(d.avg), d3.max(data, d=> Number(d.avg)))))
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

    tooltipDiv.html(`
    <div>Average: ${d.avg}</div>
    <div>Time Bucket: ${d.time_bucket}</div>
    <div>Env: ${d.env}</div>
    <div>Server Type: ${d.servertype}</div>
    `)
       .style("left", (parseFloat(d3.event.pageX) - 40) + "px")
       .style("cursor", "pointer")
       .style("top", function(d){
           return d3.event.pageY - this.offsetHeight - 17  + "px"
        })
        .style("color", "#333333");
}

function onMouseOut(d){
    var tooltipDiv = d3.select("#myTooltip");
    tooltipDiv.transition()
          .duration(500)
          .style("opacity", 0);
}
    }


    render(){
        const {classes} = this.props;
        return (
            <div>
                <h3 className={classes.title}>{this.props.title}</h3>
                <svg id="healthChart"></svg>
            </div>
        )
    }
}

export default withStyles(styles)(Chart);


Chart.defaultProps = {
    chartHeight: 100,
    chartWidth: 800,
    title: "Simple Health Chart",
    data:[
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 0.29,
            "time_bucket": "2018-08-07T03:05:00.000Z",
            "objectId": "5b690d89ac0ba706a160dd4b",
            "createdAt": 1533611401206,
            "updatedAt": 1533611401206
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 0.6,
            "time_bucket": "2018-08-07T03:00:00.000Z",
            "objectId": "5b690c5dac0ba706a160dd43",
            "createdAt": 1533611101196,
            "updatedAt": 1533611101196
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:55:00.000Z",
            "objectId": "5b690b31709fa50690a2a40d",
            "createdAt": 1533610801198,
            "updatedAt": 1533610801198
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:50:00.000Z",
            "objectId": "5b690a05fe9c6c068ba26bf2",
            "createdAt": 1533610501270,
            "updatedAt": 1533610501270
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:45:00.000Z",
            "objectId": "5b6908d9709fa50690a2a3f8",
            "createdAt": 1533610201158,
            "updatedAt": 1533610201158
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:40:00.000Z",
            "objectId": "5b6907ad77397c068af649f8",
            "createdAt": 1533609901297,
            "updatedAt": 1533609901297
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:35:00.000Z",
            "objectId": "5b6906812f253906a66ef579",
            "createdAt": 1533609601154,
            "updatedAt": 1533609601154
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:30:00.000Z",
            "objectId": "5b690555e54b720685356cd8",
            "createdAt": 1533609301284,
            "updatedAt": 1533609301284
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:25:00.000Z",
            "objectId": "5b690429fe9c6c068ba26bc4",
            "createdAt": 1533609001144,
            "updatedAt": 1533609001144
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:20:00.000Z",
            "objectId": "5b6902fd1d1b7006951d1f68",
            "createdAt": 1533608701200,
            "updatedAt": 1533608701200
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:15:00.000Z",
            "objectId": "5b6901d11d1b7006951d1f5b",
            "createdAt": 1533608401180,
            "updatedAt": 1533608401180
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:10:00.000Z",
            "objectId": "5b6900a51d1b7006951d1f4e",
            "createdAt": 1533608101256,
            "updatedAt": 1533608101256
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:05:00.000Z",
            "objectId": "5b68ff792a316706962882a5",
            "createdAt": 1533607801166,
            "updatedAt": 1533607801166
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T02:00:00.000Z",
            "objectId": "5b68fe4d2f253906a66ef522",
            "createdAt": 1533607501233,
            "updatedAt": 1533607501233
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:55:00.000Z",
            "objectId": "5b68fd21fe9c6c068ba26b8d",
            "createdAt": 1533607201193,
            "updatedAt": 1533607201193
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:50:00.000Z",
            "objectId": "5b68fbf52a3167069628828a",
            "createdAt": 1533606901202,
            "updatedAt": 1533606901202
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:45:00.000Z",
            "objectId": "5b68fac9e54b720685356c83",
            "createdAt": 1533606601164,
            "updatedAt": 1533606601164
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:40:00.000Z",
            "objectId": "5b68f99d2f253906a66ef500",
            "createdAt": 1533606301209,
            "updatedAt": 1533606301209
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:35:00.000Z",
            "objectId": "5b68f871e54b720685356c70",
            "createdAt": 1533606001154,
            "updatedAt": 1533606001154
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:30:00.000Z",
            "objectId": "5b68f745e54b720685356c68",
            "createdAt": 1533605701242,
            "updatedAt": 1533605701242
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:25:00.000Z",
            "objectId": "5b68f6191d1b7006951d1ef4",
            "createdAt": 1533605401198,
            "updatedAt": 1533605401198
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:20:00.000Z",
            "objectId": "5b68f4ed1d1b7006951d1ee8",
            "createdAt": 1533605101281,
            "updatedAt": 1533605101281
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:15:00.000Z",
            "objectId": "5b68f3c177397c068af6494b",
            "createdAt": 1533604801171,
            "updatedAt": 1533604801171
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:10:00.000Z",
            "objectId": "5b68f295ac0ba706a160dc57",
            "createdAt": 1533604501295,
            "updatedAt": 1533604501295
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:05:00.000Z",
            "objectId": "5b68f169709fa50690a2a32c",
            "createdAt": 1533604201168,
            "updatedAt": 1533604201168
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T01:00:00.000Z",
            "objectId": "5b68f03d1d1b7006951d1ec2",
            "createdAt": 1533603901231,
            "updatedAt": 1533603901231
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:55:00.000Z",
            "objectId": "5b68ef11fe9c6c068ba26b1a",
            "createdAt": 1533603601138,
            "updatedAt": 1533603601138
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:50:00.000Z",
            "objectId": "5b68ede52f253906a66ef496",
            "createdAt": 1533603301223,
            "updatedAt": 1533603301223
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:45:00.000Z",
            "objectId": "5b68ecb92f253906a66ef48d",
            "createdAt": 1533603001165,
            "updatedAt": 1533603001165
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:40:00.000Z",
            "objectId": "5b68eb8dac0ba706a160dc1d",
            "createdAt": 1533602701216,
            "updatedAt": 1533602701216
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:35:00.000Z",
            "objectId": "5b68ea61ac0ba706a160dc0f",
            "createdAt": 1533602401187,
            "updatedAt": 1533602401187
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:30:00.000Z",
            "objectId": "5b68e9352a316706962881e5",
            "createdAt": 1533602101195,
            "updatedAt": 1533602101195
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:25:00.000Z",
            "objectId": "5b68e8092a316706962881d8",
            "createdAt": 1533601801172,
            "updatedAt": 1533601801172
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:20:00.000Z",
            "objectId": "5b68e6dd2f253906a66ef455",
            "createdAt": 1533601501243,
            "updatedAt": 1533601501243
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:15:00.000Z",
            "objectId": "5b68e5b177397c068af648d2",
            "createdAt": 1533601201154,
            "updatedAt": 1533601201154
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:10:00.000Z",
            "objectId": "5b68e4852a316706962881bb",
            "createdAt": 1533600901209,
            "updatedAt": 1533600901209
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:05:00.000Z",
            "objectId": "5b68e359fe9c6c068ba26ab8",
            "createdAt": 1533600601188,
            "updatedAt": 1533600601188
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-07T00:00:00.000Z",
            "objectId": "5b68e22d77397c068af648ba",
            "createdAt": 1533600301185,
            "updatedAt": 1533600301185
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:55:00.000Z",
            "objectId": "5b68e101fe9c6c068ba26a9e",
            "createdAt": 1533600001129,
            "updatedAt": 1533600001129
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:50:00.000Z",
            "objectId": "5b68dfd52a31670696288195",
            "createdAt": 1533599701223,
            "updatedAt": 1533599701223
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:45:00.000Z",
            "objectId": "5b68dea9fe9c6c068ba26a89",
            "createdAt": 1533599401177,
            "updatedAt": 1533599401177
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:40:00.000Z",
            "objectId": "5b68dd7d2f253906a66ef403",
            "createdAt": 1533599101249,
            "updatedAt": 1533599101249
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:35:00.000Z",
            "objectId": "5b68dc51fe9c6c068ba26a73",
            "createdAt": 1533598801186,
            "updatedAt": 1533598801186
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:30:00.000Z",
            "objectId": "5b68db25fe9c6c068ba26a6b",
            "createdAt": 1533598501244,
            "updatedAt": 1533598501244
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:25:00.000Z",
            "objectId": "5b68d9f91d1b7006951d1df5",
            "createdAt": 1533598201161,
            "updatedAt": 1533598201161
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:20:00.000Z",
            "objectId": "5b68d8cd2a31670696288162",
            "createdAt": 1533597901208,
            "updatedAt": 1533597901208
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:15:00.000Z",
            "objectId": "5b68d7a1e54b720685356b58",
            "createdAt": 1533597601172,
            "updatedAt": 1533597601172
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:10:00.000Z",
            "objectId": "5b68d675ac0ba706a160db62",
            "createdAt": 1533597301233,
            "updatedAt": 1533597301233
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:05:00.000Z",
            "objectId": "5b68d549ac0ba706a160db5a",
            "createdAt": 1533597001128,
            "updatedAt": 1533597001128
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T23:00:00.000Z",
            "objectId": "5b68d41d77397c068af64846",
            "createdAt": 1533596701194,
            "updatedAt": 1533596701194
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:55:00.000Z",
            "objectId": "5b68d2f1fe9c6c068ba26a24",
            "createdAt": 1533596401125,
            "updatedAt": 1533596401125
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:50:00.000Z",
            "objectId": "5b68d1c5fe9c6c068ba26a18",
            "createdAt": 1533596101272,
            "updatedAt": 1533596101272
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:45:00.000Z",
            "objectId": "5b68d0992f253906a66ef38f",
            "createdAt": 1533595801126,
            "updatedAt": 1533595801126
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:40:00.000Z",
            "objectId": "5b68cf6d709fa50690a2a1fe",
            "createdAt": 1533595501221,
            "updatedAt": 1533595501221
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:35:00.000Z",
            "objectId": "5b68ce412f253906a66ef377",
            "createdAt": 1533595201135,
            "updatedAt": 1533595201135
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:30:00.000Z",
            "objectId": "5b68cd15709fa50690a2a1e5",
            "createdAt": 1533594901218,
            "updatedAt": 1533594901218
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:25:00.000Z",
            "objectId": "5b68cbe92a316706962880f4",
            "createdAt": 1533594601131,
            "updatedAt": 1533594601131
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:20:00.000Z",
            "objectId": "5b68cabde54b720685356aed",
            "createdAt": 1533594301246,
            "updatedAt": 1533594301246
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:15:00.000Z",
            "objectId": "5b68c99177397c068af647f0",
            "createdAt": 1533594001166,
            "updatedAt": 1533594001166
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:10:00.000Z",
            "objectId": "5b68c865ac0ba706a160daeb",
            "createdAt": 1533593701233,
            "updatedAt": 1533593701233
        },
        {
            "env": "sdk",
            "servertype": "Auth/Identity/Iportal Mongo DB",
            "avg": 1,
            "time_bucket": "2018-08-06T22:05:00.000Z",
            "objectId": "5b68c7392f253906a66ef337",
            "createdAt": 1533593401108,
            "updatedAt": 1533593401108
        },
    ]
}
