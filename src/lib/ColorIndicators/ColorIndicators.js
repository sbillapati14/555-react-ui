import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    indicator:{
        padding: '0 5px',
        position: 'relative'
      },
      colorBox:{
        width: '10px',
        height: '10px',
        background: '#000',
        position: 'absolute',
        marginTop: '3px'
      },
      healthLabel:{
            fontSize: '14px',
            fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
            padding: '0 0 0 15px',
      }
})

const ColorIndicators  = ({colorIndices, classes}) => {
        return(
        <div>
            {
                colorIndices.map((item, i)=> 
                <span className={classes.indicator} key={i}>
                    <span style={{backgroundColor: item.color}} className={classes.colorBox}></span>
                    <span className={classes.healthLabel}>{item.status}</span>
                </span>)
            }
        </div>
        )
}

ColorIndicators.defaultProps = {
    colorIndices: [
        {status: 'Down', color: '#DC2620'},
        {status: 'Issue', color: '#FF9E00'},
        {status: 'Healthy', color: '#86C35D'}
      ]
}

export default withStyles(styles)(ColorIndicators);

