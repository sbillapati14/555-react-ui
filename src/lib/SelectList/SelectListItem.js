import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Check from 'material-ui-icons/Check';

const styles = theme => ({
    root: {
        width: 238,
        color: "#fff",
        fontSize: 13,
    },
    icon: {
        marginRight: 0,
    }
});

class SelectListItem extends Component {

    handleClick = (e) => {
        const { onClick } = this.props;

        if (onClick)
            onClick(e);
    }

    render() {

        const { classes, children, selected } = this.props;

        return (
            <ListItem button disableRipple onClick={e => this.handleClick(e)}>
                <ListItemText className={classes.root} primary={children} />
                {selected && <ListItemIcon classes={{ root: classes.icon }}><Check /></ListItemIcon>}
            </ListItem>
        );
    }
}

SelectListItem.propTypes = {

    /**
     * The option elements to populate the select with.
     * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
     */
    children: PropTypes.node.isRequired,
    /**
     * The input value, required for a controlled component.
     */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]),

    active: PropTypes.bool
};

SelectListItem.defaultProps = {
    placeHolderText: 'Choose Application',
    active: false,
}

export default withStyles(styles)(SelectListItem);