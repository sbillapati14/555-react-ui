import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    root: {
        width: 238,
        color: "#fff",
        fontSize: 13,
    },
    icon: {
        marginRight: 0,
        color: "#2b9cd8"
    }
});

class SelectListItem extends Component {

    handleClick = (e) => {
        const { onClick } = this.props;

        if (onClick)
            onClick(e);
    }

    render() {

        const { classes, children, selected, value, id } = this.props;
        const selectListItemId = `selectListItemId-${id || Math.random().toString(36).substr(2, 9)}`;

        return (
            <ListItem
              id={selectListItemId}
              onClick={e => this.handleClick(e)}
            >
                <ListItemText disableTypography
                    primary={<Typography style={{ color: selected ? "#2b9cd8" : "#666666" }}>{children}</Typography>} />
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
    ]).isRequired,
    active: PropTypes.bool
};

SelectListItem.defaultProps = {
    placeHolderText: 'Choose Application',
    active: false,
}

export default withStyles(styles)(SelectListItem);
