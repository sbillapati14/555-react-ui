import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    issuesWidget: {
        height: '230px',
        width: '329px',
        marginBottom: '32px',
        display: 'inline-block',
        borderRadius: '5px',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0px 1px 28px -6px rgba(0,0,0,0.3)',
    },
    wiggetHeader:{
        borderBottom: '1px solid #e9e9e9',
    },
    widgetTitle:{
        color: '#1682bc',
        fontWeight: 'bold',
        paddingLeft: '55px',
        lineHeight: '26px',
        position: 'relative',
        fontSize: '19px',
        before:{
            top: '17px',
            left: '19px',
            width: '28px',
            height: '28px',
            backgroundPosition: '-247px -176px',
            content: "",
            display: 'block',
            backgroundSize: '750px 340px',
            position: 'absolute'
        }
    },
    leftChartBody:{
        position:'relative',
        float: 'left',
        display: 'inline-flex',
    },
    issueChartContainer:{
        width: '188px',
        position: 'relative',
    },
    board:{
        position: 'absolute',
        width: '82px',
        height: '84px',
        background: '#fff',
        top: '4px',
        right: '14px',
    },
    totalCount:{
        fontSize: '38px',
        color: '#7d7d7d',
        textAlign: 'center',
        margin: '11px',
    },
    txt:{
        fontSize: '12px',
        color: '#767676',
        textAlign: 'center',
    },
    chartLegendsLeft:{
        margin: '46px 0 0 0',
        float: 'left',
    },
    legend:{
        fontSize: '14px',
        color: '#9b9b9b',
        margin: '0 0 8px 0',
    },
    values:{
        fontSize: '17px',
    }
}

const Issues = ({ issues, totalIssueCount }) => {
    return(

    <div className="left chart-body" style={styles.leftChartBody}>
<div className="issue-chart-container left" style={styles.issueChartContainer}>
<div className="board" style={styles.board}>
<p className="total-count" style={styles.totalCount}>{totalIssueCount}</p>
    <p className="txt" style={styles.txt}>Total Issues</p>
    </div>
    <svg width="188" height="169"><g className="issue-chart-svg" transform="translate(88,84.5)"></g></svg></div>
    <div className="chart-legends left" style={styles.chartLegendsLeft}>
    {issues.map((item, index)=> <p key={index} style={styles.legend} className="legend"><span className="values">{item.issueCount} </span> {item.issueName}</p>)}
</div>
    </div>
)
}


Issues.propTypes = {
    issues: PropTypes.array.isRequired,
    totalIssueCount: PropTypes.number.isRequired,
}

Issues.defaultProps = {
    issues: [{issueCount:2, issueName:'Open Issues'}, {issueCount:5, issueName:'Closed Issues'}],
    totalIssueCount: 0
}

export default Issues;