import React from 'react';
import { withStyles } from 'material-ui/styles';
import DomainIcon from 'material-ui-icons/Domain'


const styles = theme => {
    return {
        panel:{
            color:' #5cb85c',
            textAlign: 'center',
            marginBottom: '20px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
            boxShadow: '0 1px 10px rgba(0, 0, 0, .3)',
            maxWidth: '250px'
        },
        panelBody:{
            padding: '15px'
        },
        panelFooter:{
            color: '#fff',
            backgroundColor: '#5cb85c',
            padding: '12px 15px',
            textAlign: 'center',
            borderTop: '0px solid #fff;',
            boxSizing: 'border-box'
        },
        icon:{
            height: '80px',
            width: '80px'
        },
        count:{
            margin : 0,
            fontSize: '24px',
            fontWeight: 'normal'
        }
    }
    };

const Analytics  = (props) => {
    const {Icon, title, count, classes} = props;
    return(
            <div className={classes.panel}>
                <div className={classes.panelBody}>
                   <Icon className={classes.icon}/>
                    <h3 className={classes.count}>{count}</h3>
                </div>
                    <div className={classes.panelFooter}>
                    {title}
                  </div>
            </div>
    )
}

Analytics.defaultProps = {
    count: '8,557',
    title: 'Default Title',
    Icon: DomainIcon
}

export default withStyles(styles)(Analytics);



