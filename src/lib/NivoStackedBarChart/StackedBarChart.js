import React from 'react'
// import * as d3 from 'd3';
import { withStyles } from '@material-ui/core/styles';
import { ResponsiveBar } from '@nivo/bar'

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
  },
  barChartTitle:{
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    textAlign: 'center',
    color: '#333'
  },
  barChart: {
    height: '400px'
  }
})

class StackedBarChartComponent extends React.Component{

    constructor(props){
        super(props);
        this.state ={};
        this.renderChart = this.renderChart.bind(this);
    }

    renderChart(){

      const {data} = this.props;

      // console.log("Nivo data: " + JSON.stringify(data));

      return(
              <ResponsiveBar
                  data={data}
                  keys={[
                      "200",
                      "301"
                  ]}
                  indexBy="time_bucket"
                  margin={{
                      "top": 50,
                      "right": 130,
                      "bottom": 100,
                      "left": 80
                  }}
                  padding={0.05}
                  colors="nivo"
                  colorBy="id"
                  borderColor="inherit:darker(1.6)"
                  axisBottom={{
                      "orient": "bottom",
                      "tickSize": 5,
                      "tickPadding": 5,
                      "tickRotation": -45,
                      "legend": "Response Codes",
                      "legendOffset": 90,
                      "legendPosition": "middle"
                  }}
                  axisLeft={{
                      "orient": "left",
                      "tickSize": 5,
                      "tickPadding": 5,
                      "tickRotation": 0,
                      "legend": "count",
                      "legendOffset": -60,
                      "legendPosition": "middle"
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor="inherit:darker(1.6)"
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  legends={[
                      {
                          "dataFrom": "keys",
                          "anchor": "bottom-right",
                          "direction": "column",
                          "justify": false,
                          "translateX": 120,
                          "translateY": 0,
                          "itemsSpacing": 2,
                          "itemWidth": 100,
                          "itemHeight": 20,
                          "itemDirection": "left-to-right",
                          "itemOpacity": 0.85,
                          "symbolSize": 20,
                          "effects": [
                              {
                                  "on": "hover",
                                  "style": {
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
          <div className={classes.barWrapper}>
            <h3 className={classes.barChartTitle}>{title}</h3>
            <div id={this.props.chartId} className={classes.barChart}>
              {this.renderChart()}
            </div>
          </div>
        )
    }

}

export default withStyles(styles)(StackedBarChartComponent);

StackedBarChartComponent.defaultProps = {
data : [
  {"time_bucket":"2018-09-26 16:03","200":31,"301":1},
  {"time_bucket":"2018-09-26 16:04","200":22},
  {"time_bucket":"2018-09-26 16:05","200":22},
  {"time_bucket":"2018-09-26 16:06","200":22},
  {"time_bucket":"2018-09-26 16:07","200":23},
  {"time_bucket":"2018-09-26 16:08","200":22},
  {"time_bucket":"2018-09-26 16:09","200":23,"301":1},
  {"time_bucket":"2018-09-26 16:10","200":21},
  {"time_bucket":"2018-09-26 16:11","200":20},
  {"time_bucket":"2018-09-26 16:12","200":20},
  {"time_bucket":"2018-09-26 16:13","200":20},
  {"time_bucket":"2018-09-26 16:14","200":27},
  {"time_bucket":"2018-09-26 16:15","200":27,"301":1},
  {"time_bucket":"2018-09-26 16:16","200":21},
  {"time_bucket":"2018-09-26 16:17","200":25},
  {"time_bucket":"2018-09-26 16:18","200":24},
  {"time_bucket":"2018-09-26 16:19","200":26},
  {"time_bucket":"2018-09-26 16:20","200":25,"301":1},
  {"time_bucket":"2018-09-26 16:21","200":23},
  {"time_bucket":"2018-09-26 16:22","200":22},
  {"time_bucket":"2018-09-26 16:23","200":22},
  {"time_bucket":"2018-09-26 16:24","200":24},
  {"time_bucket":"2018-09-26 16:25","200":23},
  {"time_bucket":"2018-09-26 16:26","200":27,"301":1},
  {"time_bucket":"2018-09-26 16:27","200":24},
  {"time_bucket":"2018-09-26 16:28","200":23},
  {"time_bucket":"2018-09-26 16:29","200":22},
  {"time_bucket":"2018-09-26 16:30","200":26},
  {"time_bucket":"2018-09-26 16:31","200":23},
  {"time_bucket":"2018-09-26 16:32","200":25,"301":1},
  {"time_bucket":"2018-09-26 16:33","200":22}
],
  rangeBandX: 0,
  barPadding: .2,
  title: "Stacked Bar Chart Demo"
}
