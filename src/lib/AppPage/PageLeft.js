import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    pageLeft: {
        float: 'left',
        paddingRight: '360px',
    },
    '@media (max-width: 767px)': {
        pageLeft: {
            float: 'none',
            padding: 0,
        },
    },
    '@media (max-width: 1024px) and (min-width: 768px)': {
        pageLeft: {
            float: 'none',
            paddingRight: '0',
        },
    }
})

class PageLeft extends Component {
    render() {

        const { children, classes } = this.props;

        return (
            <div className={classes.pageLeft}>
                {children}
            </div>
        );
    }
}

export default withStyles(styles)(PageLeft);