import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    pageRight: {
        position: 'absolute',
        right: '29px',
    },
    '@media (max-width: 1024px) and (min-width: 768px)': {
        pageRight: {
            position: 'static',
            margin: '22px 0 0 0',
        },
    }
})

class PageRight extends Component {
    render() {
        const { children, classes } = this.props;

        return (
            <div className={classes.pageRight}>
                {children}
            </div>
        );
    }
}

export default withStyles(styles)(PageRight);