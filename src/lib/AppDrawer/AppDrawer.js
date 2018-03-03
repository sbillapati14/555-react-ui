import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    leftNavigation: {
        background: ' #182831',
        width: '266px',
        height: '100%',
        position: 'relative',
        zIndex: 1,
        float: 'left',
        transition: 'all .5s',
        '& .logo': {
            height: '63px',
            background: '#2e4957',
            width: '265px',
            '& .txt': {
                textAlign: 'center',
                fontWeight: 400,
                lineHeight: '65px',
                fontSize: '23px',
                color: '#FFF',
            },
            '& .medium': {
                fontWeight: 'bold',
            }
        },
        '& .nav': {
            marginTop: '16px',
            height: '100%',
        }
    },
    '@media (max-width: 1024px)': {
        leftNavigation: {
            width: '300px',
            position: 'fixed',
            height: '100%',
            right: 0,
            top: 0,
            zIndex: 100,
            transform: 'translateX(300px)',
            transition: 'all .5s',
            '& .logo': {
                height: '56px',
                width: '100%',
                position: 'absolute',
                top: 0,
            },
            '& .nav': {
                position: 'relative',
                top: '56px',
                height: 'calc(100% - 56px)',
                overflow: 'auto',
                overflowX: 'hidden',
            }
        },
        isMobileOpen: {
            transform: 'translateX(0)',
        },
    },
});

class AppDrawer extends Component {

    state = {
        drawerHeight: '100%',
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
        this.setState({ drawerHeight: `${this.getHeight()}px` });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize = (e) => {
        // console.log('Window height', e)
        this.setState({ drawerHeight: `${this.getHeight()}px` });
    }

    getHeight() {
        const body = document.body,
            html = document.documentElement;

        return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    }

    getNavClasses() {
        const { classes, isMobileOpen } = this.props;

        if (isMobileOpen)
            return `${classes.leftNavigation} ${classes.isMobileOpen}`;

        return classes.leftNavigation;

    }

    render() {

        const { children, title } = this.props;

        let theTitle = title;
        // do some work on the title
        if (theTitle && typeof theTitle === 'string' && theTitle.indexOf('|')) {
            // split the string on | 
            const t = theTitle.split('|');
            theTitle = (
                <Typography className="txt" type="title" color="inherit">
                    <span className="medium">{t[0]}</span> {t[1]}
                </Typography>
            )
        }

        return (

            <aside className={this.getNavClasses()} style={{ height: this.state.drawerHeight }}>

                <div className="logo">
                    {theTitle}
                </div>

                <div className="nav">
                    {children}
                </div>

            </aside >
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