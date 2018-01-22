import React, { Component } from 'react';
import withStyles from "material-ui/styles/withStyles";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import MenuList from '../DropDown/MenuList';


import AppDrawer from '../AppDrawer';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '100vh',
        width: '100%',
    },
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
    appContent: {
        transition: theme.transitions.create('margin-left'),
        [theme.breakpoints.up('lg')]: {
            width: 'calc(100% - 266px)',
        },
        ...theme.mixins.gutters({
            paddingTop: 80,
            flex: 'auto',
            maxWidth: '100%',
            margin: '0 auto',
        })
    },
    appContentMobile: {
        marginLeft: '-266px',
        [theme.breakpoints.up('lg')]: {
            marginLeft: 0,
        },
    }
});

class AppFrame extends Component {

    state = {
        mobileOpen: false,
    };

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { children, classes, title, content, drawerTitle, drawerContent } = this.props;
        const { mobileOpen } = this.state;

        let appBarClassName = classes.appBar;
        let drawerClassName = classes.drawer;
        let appContentClassName = classes.appContent;
        if (mobileOpen) {
            appBarClassName += ` ${classes.appBarMobile}`;
            drawerClassName += ` ${classes.drawerRight}`;
            appContentClassName += ` ${classes.appContentMobile}`;
        }

        return (
            <div className={classes.root}>
                <AppBar className={appBarClassName}>
                    <Toolbar className={classes.toolbar}>
                        {title !== null && (
                            <Typography className={classes.title} type="title" color="inherit" noWrap>
                                {title}
                            </Typography>
                        )}
                        <div className={classes.grow} />
                        {content !== null && (
                            <div>{content}</div>
                        )}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => this.handleDrawerToggle()}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>
                      <MenuList/>
                    </Toolbar>
                </AppBar>
                <AppDrawer
                    className={drawerClassName}
                    onClose={this.handleDrawerToggle}
                    mobileOpen={mobileOpen}
                    title={drawerTitle}
                >
                    {drawerContent}
                </AppDrawer>

                <div className={appContentClassName}>
                    {children}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(AppFrame);