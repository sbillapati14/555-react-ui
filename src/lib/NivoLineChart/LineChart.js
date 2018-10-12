import React from 'react'
import * as d3 from 'd3';
import { withStyles } from '@material-ui/core/styles';
import { ResponsiveLine } from '@nivo/line'

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

      const {data} = this.props;

      console.log("Nivo data: " + JSON.stringify(this.props.data));

      return(
          <ResponsiveLine
              data={this.props.data}
              margin={{
                  "top": 50,
                  "right": 110,
                  "bottom": 50,
                  "left": 60
              }}
              xScale={{
                  "type": "point"
              }}
              yScale={{
                  "type": "linear",
                  "stacked": true,
                  "min": "auto",
                  "max": "auto"
              }}
              minY="auto"
              maxY="auto"
              stacked={true}
              axisBottom={{
                  "orient": "bottom",
                  "tickSize": 5,
                  "tickPadding": 5,
                  "tickRotation": 0,
                  "legend": "transportation",
                  "legendOffset": 36,
                  "legendPosition": "center"
              }}
              axisLeft={{
                  "orient": "left",
                  "tickSize": 5,
                  "tickPadding": 5,
                  "tickRotation": 0,
                  "legend": "count",
                  "legendOffset": -40,
                  "legendPosition": "center"
              }}
              dotSize={10}
              dotColor="inherit:darker(0.3)"
              dotBorderWidth={2}
              dotBorderColor="#ffffff"
              enableDotLabel={true}
              dotLabel="y"
              dotLabelYOffset={-12}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              legends={[
                  {
                      "anchor": "bottom-right",
                      "direction": "column",
                      "justify": false,
                      "translateX": 100,
                      "translateY": 0,
                      "itemsSpacing": 0,
                      "itemDirection": "left-to-right",
                      "itemWidth": 80,
                      "itemHeight": 20,
                      "itemOpacity": 0.75,
                      "symbolSize": 12,
                      "symbolShape": "circle",
                      "symbolBorderColor": "rgba(0, 0, 0, .5)",
                      "effects": [
                          {
                              "on": "hover",
                              "style": {
                                  "itemBackground": "rgba(0, 0, 0, .03)",
                                  "itemOpacity": 1
                              }
                          }
                      ]
                  }
              ]}
          />
      )

    }

    render(){
      var chartToRender = document.getElementById('barChart');
      if(chartToRender){
        this.renderChart();
      }
      const {title, classes} = this.props;
        return(
          <div className={classes.lineWrapper}>
            <h3 className={classes.lineChartTitle}>{title}</h3>
            <div id={this.props.chartId}>
          <ResponsiveLine
              data={this.props.data}
              margin={{
                  "top": 50,
                  "right": 110,
                  "bottom": 50,
                  "left": 60
              }}
              xScale={{
                  "type": "point"
              }}
              yScale={{
                  "type": "linear",
                  "stacked": true,
                  "min": "auto",
                  "max": "auto"
              }}
              minY="auto"
              maxY="auto"
              stacked={true}
              axisBottom={{
                  "orient": "bottom",
                  "tickSize": 5,
                  "tickPadding": 5,
                  "tickRotation": 0,
                  "legend": "transportation",
                  "legendOffset": 36,
                  "legendPosition": "center"
              }}
              axisLeft={{
                  "orient": "left",
                  "tickSize": 5,
                  "tickPadding": 5,
                  "tickRotation": 0,
                  "legend": "count",
                  "legendOffset": -40,
                  "legendPosition": "center"
              }}
              dotSize={10}
              dotColor="inherit:darker(0.3)"
              dotBorderWidth={2}
              dotBorderColor="#ffffff"
              enableDotLabel={true}
              dotLabel="y"
              dotLabelYOffset={-12}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              legends={[
                  {
                      "anchor": "bottom-right",
                      "direction": "column",
                      "justify": false,
                      "translateX": 100,
                      "translateY": 0,
                      "itemsSpacing": 0,
                      "itemDirection": "left-to-right",
                      "itemWidth": 80,
                      "itemHeight": 20,
                      "itemOpacity": 0.75,
                      "symbolSize": 12,
                      "symbolShape": "circle",
                      "symbolBorderColor": "rgba(0, 0, 0, .5)",
                      "effects": [
                          {
                              "on": "hover",
                              "style": {
                                  "itemBackground": "rgba(0, 0, 0, .03)",
                                  "itemOpacity": 1
                              }
                          }
                      ]
                  }
              ]}
          />
            </div>
          </div>
        )
    }

}

export default withStyles(styles)(LineChartComponent);

LineChartComponent.defaultProps = {
data : [
    {
      "id":"P50",
      "data":[
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
      "id":"P95",
      "data":[
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
      "id":"P99",
      "data":[
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