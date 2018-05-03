import React from 'react';

const styles = {
    issuesWidget: {
        height: '230px',
        width: '329px',
        marginBottom: '32px',
        display: 'inline-block',
        borderRadius: '5px',
        backgroundColor: 'rgb(255, 255, 255)',
        // -webkitBoxShadow: '0px 1px 28px -6px rgba(0,0,0,0.3)',
        // -mozBoxShadow: '0px 1px 28px -6px rgba(0,0,0,0.3)',
        boxShadow: '0px 1px 28px -6px rgba(0,0,0,0.3)',
        fontFamily: 'inherit'
    },
    wiggetHeader:{
        height: '60px',
        borderBottom: '1px solid #e9e9e9',
        fontFamily: 'inherit'
    },
    widgetTitle:{
        color: '#1682bc',
        fontWeight: '500',
        paddingLeft: '55px',
        lineHeight: '64px',
        position: 'relative',
        fontSize: '19px',
        fontFamily: 'inherit',
        before:{
            top: '17px',
            left: '19px',
            width: '28px',
            height: '28px',
            backgroundPosition: '-247px -176px',
            content: "",
            display: 'block',
            // background: url(../i/icons_d.png) no-repeat,
            backgroundSize: '750px 340px',
            position: 'absolute'
        }
    },
    leftChartBody:{
        position:'relative',
        float: 'left',
        display: 'inline-flex',
        fontFamily: 'inherit'
    },
    issueChartContainer:{
        width: '188px',
        position: 'relative',
        fontFamily: 'inherit'
    },
    board:{
        position: 'absolute',
        width: '82px',
        height: '84px',
        background: '#fff',
        top: '4px',
        right: '14px',
        fontFamily: 'inherit'
    },
    totalCount:{
        fontSize: '38px',
        color: '#7d7d7d',
        textAlign: 'center',
        margin: '11px 0 0',
        lineHeight: 'normal',
        fontFamily: 'inherit'
    },
    txt:{
        fontSize: '12px',
        color: '#767676',
        textAlign: 'center',
        lineHeight: 'normal',
        fontFamily: 'inherit'
    },
    chartLegendsLeft:{
        margin: '46px 0 0 0',
        float: 'left',
        fontFamily: 'inherit'
    },
    legend:{
        fontSize: '13px',
        color: '#9b9b9b',
        margin: '0 0 8px 0;',
        lineHeight: 'normal',
        fontFamily: 'inherit'
    },
    values:{
        fontSize: '17px',
        fontFamily: 'inherit'
    }
}

export default class Issues extends React.Component{
render(){
    const {issues, totalIssueCount} = this.props;
        return(
            <div style={styles.issuesWidget}>
              <div style={styles.wiggetHeader}>
                <h3 class="title" style={styles.widgetTitle}>Issues</h3>
              </div>
              <div class="left chart-body" style={styles.leftChartBody}>
                <div class="issue-chart-container left" style={styles.issueChartContainer}>
                  <div class="board" style={styles.board}>
                    <p class="total-count" style={styles.totalCount}>{totalIssueCount}</p>
                    <p class="txt" style={styles.txt}>Total Issues</p>
                  </div>
                <svg width="188" height="169"><g class="issue-chart-svg" transform="translate(88,84.5)"></g></svg></div>
                <div class="chart-legends left" style={styles.chartLegendsLeft}>
                {issues.map((item, index)=> <p key={index} style={styles.legend} class="legend"><span class="values">{item.issueCount} </span> {item.issueName}</p>)}
                </div>
              </div>
            </div>
        )
    }
    }

const mockProps = {
    issues: [{issueCount:2, issueName:'Open Issues'}, {issueCount:5, issueName:'Closed Issues'}],
    totalIssueCount: 0
}