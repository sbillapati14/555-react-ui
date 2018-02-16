import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';

const styles = theme => ({
    root: {
        padding: 0
    }
})

class SideNav extends Component {

    state = {
        openIndex: -1,
    }

    processChild(child, index) {
        if (React.Children.count(child.props.children) === 0)
            return child;

        const { openIndex } = this.state;
        return React.cloneElement(child, { onClick: (e) => this.handleSectionClick(e, index), open: openIndex === index });
    }

    handleSectionClick(e, index) {
        this.setState({ openIndex: index });
    }

    render() {
        const { children, classes } = this.props;

        const items = React.Children.map(children, (child, index) => this.processChild(child, index));

        return (
            <List component="ul" classes={{ root: classes.root }}>
                {items}
            </List>
        );
    }
}

SideNav.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(SideNav);