import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
    appBar: {
        display: 'block',
        width: '100%',
        height: '63px',
        background: '#fff',
        boxShadow: ' 0px -5px 24px 0 rgba(0,0,0,0.3)',
    },
    hamburIcon: {
        display: 'none',
        position: 'absolute',
        color: '#FFF',
    },
    logo: {
        float: 'left',
        display: 'block',
        margin: '16px 0 0 17px',
        position: 'relative',
        '&:before': {
            content: "''"
        },
        '& .txt': {
            float: 'left',
            display: 'block',
            lineHeight: '35px',
            color: '#282828',
            fontSize: '22px'
        },
        '& .icon': {
            float: 'left',
            display: 'block',
            color: '#282828',
            transform: 'scale(1.7)',
            margin: '4px 14px 0 0'
        }
    },
    toolbar: {
        float: 'right',
        width: '474px',
        height: '36px',
        margin: '9px 28px 0 0',
        position: 'relative',
    },
    '@media (max-width: 767px)': {
        hamburIcon: {
            top: '19px',
            right: '23px',
        }
    },
    '@media (max-width: 1024px)': {
        appBar: {
            height: '110px',
            backgroundImage: 'linear-gradient( 0deg, rgb(43,156,216) 0%, rgb(48,183,255) 100%)',
            boxShadow: '0px 5px 65px 0px rgba(1, 1, 1, 0.1)',
        },
        hamburIcon: {
            display: 'block',
            top: '19px',
            right: '19px',
        },
        logo: {
            margin: '16px 0 0 19px',
            '& .txt': {
                color: '#FFF',
            },
            '& .icon': {
                color: '#FFF',
                transform: 'scale(1.3)',
                margin: '4px 9px 0 0'
            }
        },
        toolbar: {
            position: 'absolute',
            width: '90%',
            top: '60px',
            left: 0,
            margin: '0 18px',
        },
    },
    '@media (max-width: 1024px) and (min-width: 768px)': {
        appBar: {
            height: '60px',
        },
        toolbar: {
            position: 'absolute',
            width: '270px',
            top: '8px',
            right: '60px',
            left: 'auto',
            margin: 0,
        },
    },
});

class AppBar extends Component {

    handleClick = (e) => {
        const { toggleDrawer } = this.props;
        if (toggleDrawer)
            toggleDrawer(e);
    }

    renderIcon() {
        const { icon } = this.props;
        if (icon)
            return React.cloneElement(icon, { className: 'icon' })
    }

    render() {

        const { children, classes, title, } = this.props;

        return (
            <header className={classes.appBar}>
                <MenuIcon className={classes.hamburIcon} onClick={this.handleClick} />
                <div className={classes.logo}>
                    {this.renderIcon()}
                    <div className="txt">{title}</div>
                </div>
                <div className={classes.toolbar}>
                    {children}
                </div>
            </header>
        )
    }
}

AppBar.propTypes = {
    isMobileOpen: PropTypes.bool,
    toggleDrawer: PropTypes.func,
}

AppBar.defaultProps = {
    isMobileOpen: false,
}

export default withStyles(styles)(AppBar);