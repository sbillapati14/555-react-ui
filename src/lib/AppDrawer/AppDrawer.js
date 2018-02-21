import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

const styles = theme => {
    return {
        root: {
            display: 'flex',
            alignItems: 'stretch',
            minHeight: '100vh',
            width: '100%',
            fontWeight: 500,
            fontSize: 15,
        },
        drawer: {
            transition: theme.transitions.create(['width']),
            [theme.breakpoints.up('lg')]: {
                width: 266,
            },
            [theme.breakpoints.down('md')]: {
                order: 1,
                width: 0,
            },
            backgroundColor: '#182831',
        },
        drawerRight: {
            display: 'block',
            width: 266,
            [theme.breakpoints.up('lg')]: {
                width: 266,
                order: 'inherit',
            },
        },
        // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
        toolbarIe11: {
            display: 'flex',
        },
        toolbar: {
            width: '100%',
        },
        medium: {
            fontWeight: 'bold',
            fontSize: 20,
        },
        medium2: {
        fontSize: 20,
        fontWeight: 500,
        }
    }
};

class AppDrawer extends Component {
    render() {
        const { children, classes, title, isMobileOpen } = this.props;

        let theTitle = title;
        let drawerClassName = classes.drawer;
        if (isMobileOpen)
            drawerClassName += ` ${classes.drawerRight}`;

        // do some work on the title
        if (theTitle && typeof theTitle === 'string' && theTitle.indexOf('|')) {
            // split the string on | 
            const t = theTitle.split('|');
            theTitle = (
                <Typography type="title" color="inherit">
                    <span className={classes.medium}>{t[0]}</span><span className={classes.medium2}>{t[1]}</span>
                </Typography>
            )
        }

        return (
            <aside className={drawerClassName}>
                <div className={classes.toolbarIe11}>
                    <Toolbar className={classes.toolbar}>
                        {theTitle}
                        <Divider absolute />
                    </Toolbar>
                </div>

                {children}

            </aside>
        )
    }
}

AppDrawer.propTypes = {
    isMobileOpen: PropTypes.bool,
    toggleDrawer: PropTypes.func,
}

AppDrawer.propDefaults = {
    isMobileOpen: false,
}

export default withStyles(styles)(AppDrawer);