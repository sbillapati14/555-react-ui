import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      textAlign: 'center',
    },
    progressImg:{
        width: '150px'
    }
    })
function ProgressIndicator (props){
    const {classes} = props;
    return(
        <div className={classes.root}>
            <img className={classes.progressImg} src={require('./Progressindicator.gif')} alt="indicator"/>
        </div>
    )
}
export default withStyles(styles)(ProgressIndicator);
