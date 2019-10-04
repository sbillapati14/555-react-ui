import React from 'react'
// import * as d3 from 'd3';
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
  },
  lineChartTitle:{
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    textAlign: 'center',
    color: '#333'
  },
  lineChart: {
    height: '400px'
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

      // console.log("Nivo data: " + JSON.stringify(data));

      return(
              <ResponsiveLine
                  data={data}
                  margin={{
                      "top": 50,
                      "right": 110,
                      "bottom": 90,
                      "left": 80
                  }}
                  xScale={{
                      "type": "point"
                  }}
                  yScale={{
                      "type": "linear",
                      "stacked": false,
                      "min": 0,
                      "max": "auto"
                  }}
                  minY="auto"
                  maxY="auto"
                  stacked={false}
                  axisBottom={{
                      "orient": "bottom",
                      "tickSize": 5,
                      "tickPadding": 5,
                      "tickRotation": -45,
                      "legend": "Date",
                      "legendOffset": 90,
                      "legendPosition": "center"
                  }}
                  axisLeft={{
                      "orient": "left",
                      "tickSize": 5,
                      "tickPadding": 5,
                      "tickRotation": 0,
                      "legend": "Avg Response Time (ms)",
                      "legendOffset": -60,
                      "legendPosition": "center"
                  }}
                  dotSize={10}
                  dotColor="inherit:darker(0.3)"
                  dotBorderWidth={2}
                  dotBorderColor="#ffffff"
                  enableGridX={false}
                  enableGridY={false}
                  enableDots={true}
                  enableDotLabel={false}
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
      var chartToRender = document.getElementById('lineChart');
      if(chartToRender){
        this.renderChart();
      }
      const {title, classes} = this.props;
        return(
          <div className={classes.lineWrapper}>
            <h3 className={classes.lineChartTitle}>{title}</h3>
            <div id={this.props.chartId} className={classes.lineChart}>
              {this.renderChart()}
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
        {"x":"2018-09-26 16:33","y":23.29},
        {"x":"2018-09-26 16:32","y":19.00},
        {"x":"2018-09-26 16:31","y":18.22},
        {"x":"2018-09-26 16:30","y":35.79},
        {"x":"2018-09-26 16:29","y":15.73},
        {"x":"2018-09-26 16:28","y":16.23},
        {"x":"2018-09-26 16:27","y":10.19},
        {"x":"2018-09-26 16:26","y":10.49},
        {"x":"2018-09-26 16:25","y":18.19},
        {"x":"2018-09-26 16:24","y":22.40}
      ]
    },
    {
      "id":"P95",
      "data":[
        {"x":"2018-09-26 16:33","y":19.80},
        {"x":"2018-09-26 16:32","y":19.19},
        {"x":"2018-09-26 16:31","y":20.73},
        {"x":"2018-09-26 16:30","y":24.41},
        {"x":"2018-09-26 16:29","y":20.50},
        {"x":"2018-09-26 16:28","y":18.83},
        {"x":"2018-09-26 16:27","y":22.67},
        {"x":"2018-09-26 16:26","y":22.91},
        {"x":"2018-09-26 16:25","y":23.46},
        {"x":"2018-09-26 16:24","y":20.75}
      ]
    },
    {
      "id":"P99",
      "data":[
        {"x":"2018-09-26 16:33","y":21.76},
        {"x":"2018-09-26 16:32","y":17.57},
        {"x":"2018-09-26 16:31","y":35.07},
        {"x":"2018-09-26 16:30","y":33.12},
        {"x":"2018-09-26 16:29","y":29.64},
        {"x":"2018-09-26 16:28","y":27.28},
        {"x":"2018-09-26 16:27","y":21.29},
        {"x":"2018-09-26 16:26","y":28.84},
        {"x":"2018-09-26 16:25","y":27.32},
        {"x":"2018-09-26 16:24","y":28.99}
      ]
    }
  ],
  rangeBandX: 0,
  linePadding: .2,
  title: "Line Chart Demo"
}
