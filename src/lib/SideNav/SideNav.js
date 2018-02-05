import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';


const styles = theme => ({
   root: {
     marginTop : '65px',
    }
});

class SideNav extends Component {

   state = {
     open: false,
    }

    toggleDropDown = (e) => {
     this.setState({ open: !this.state.open });
    }

    render() {
        const { classes, children, } = this.props;

        return (
            <List className={classes.root}>
                  {children}
            </List>
        );
    }
}

SideNav.propTypes = {
};

SideNav.defaultProps = {

}

export default withStyles(styles)(SideNav);