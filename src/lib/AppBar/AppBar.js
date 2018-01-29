import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import { default as MaterialAppBar } from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
    grow: {
        flex: '1 1 auto',
    },
    title: {
        marginLeft: 24,
        flex: '0 1 auto',
    },
    navIconHide: {
        transition: theme.transitions.create(['display']),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    toolbar: {
        backgroundColor: '#FFF',
        color: '#282828',
        [theme.breakpoints.down('md')]: {
            backgroundColor: 'inherit',
            color: '#FFF'
        },
    },
    appBar: {
        transition: theme.transitions.create(['right']),
        '@media print': {
            position: 'absolute',
        },
        [theme.breakpoints.up('lg')]: {
            width: 'calc(100% - 266px)',
        },
        [theme.breakpoints.down('md')]: {
            order: 1,
        },
    },
    appBarMobile: {
        right: 266,
        [theme.breakpoints.up('lg')]: {
            right: 0,
            width: 'calc(100% - 266px)',
        },
    },
});

class AppBar extends Component {

    render() {

        const { children, classes, isMobileOpen, toggleDrawer, title, ...reset } = this.props;

        let appBarClassName = classes.appBar;
        if (isMobileOpen)
            appBarClassName += ` ${classes.appBarMobile}`;

        return (
            <MaterialAppBar className={appBarClassName} {...reset}>
                <Toolbar className={classes.toolbar}>

                    {title && <Typography className={classes.title} type="title" color="inherit" noWrap>
                        {title}
                    </Typography>}

                    <div className={classes.grow} />

                    <div>
                        {children}
                    </div>
                    
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => toggleDrawer()}
                        className={classes.navIconHide}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </MaterialAppBar>
        )
    }
}

AppBar.propTypes = {
    isMobileOpen: PropTypes.bool,
    toggleDrawer: PropTypes.func,
}

AppBar.propDefaults = {
    isMobileOpen: false,
}

export default withStyles(styles)(AppBar);