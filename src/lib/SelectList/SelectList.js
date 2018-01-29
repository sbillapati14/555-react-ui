import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';

import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';

const styles = theme => ({
    root: {
        width: 238,
        margin: '16px 14px 14px',
        color: "#fff",
        fontSize: 13,
    },
    selectedItem: {
        borderRadius: '5px',
        height: 45,
        color: '#fff',
        fontSize: 15,
        lineHeight: 45,
        paddingLeft: 17,
        position: 'relative',
        backgroundImage: '-webkit-linear-gradient( 0deg, rgb(43,156,216) 0%, rgb(48,183,255) 100%)'
    },
    selectedItemOpen: {
        borderRadius: '5px 5px 0 0',
    },
    selectedItemIcon: {
        marginRight: 0,
    },
    listItemsContainer: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '0 0 5px 5px',
    },
    subHeaderText: {
        color: '#282828',
        fontWeight: 'bold',
        fontSize: '1rem',
        lineHeight: '17px',
    },
    listItems: {
        paddingTop: 0
    }
});


class SelectList extends Component {

    state = {
        open: false,
    }

    toggleDropDown = (e) => {
        this.setState({ open: !this.state.open });
    }

    handleItemClick = child => event => {
        this.setState({ open: false });

        if (this.props.onChange) {
            const { onChange, name } = this.props;
            let value;
            let target;

            if (event.target) {
                target = event.target;
            }

            value = child.props.value;

            event.persist();
            event.target = { ...target, value, name };

            onChange(event, child);
        }
    }


    render() {
        const { classes, subHeaderText, placeHolderText, children, value } = this.props;

        let selectedItemClass = classes.selectedItem;
        if (this.state.open)
            selectedItemClass += ` ${classes.selectedItemOpen}`

        const items = React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
                return null;
            }
            let selected = value === child.props.value;

            return React.cloneElement(child, {
                role: 'option',
                selected,
                onClick: this.handleItemClick(child),
            });
        });

        // const text = value ? children.

        return (
            <List className={classes.root} component="ul">
                <ListItem button disableRipple className={selectedItemClass} onClick={this.toggleDropDown}>
                    <ListItemText primary={value ? value : placeHolderText} />
                    <ListItemIcon className={classes.selectedItemIcon}>
                        {this.state.open ? <ArrowDropUp /> : <ArrowDropDown />}
                    </ListItemIcon>
                </ListItem>
                <Collapse component="li" in={this.state.open} className={classes.listItemsContainer}>
                    <ListSubheader classes={{ root: classes.subHeaderText }}
                        component='p' disableSticky >
                        {subHeaderText}
                    </ListSubheader>
                    <List classes={{ root: classes.listItems }}>
                        {items}
                    </List>
                </Collapse>
            </List>
        );
    }
}

SelectList.propTypes = {
    subHeaderText: PropTypes.string,
    placeHolderText: PropTypes.string,
    /**
     * The option elements to populate the select with.
     * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
     */
    children: PropTypes.node.isRequired,
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object.isRequired,
    /**
     * Callback function fired when a menu item is selected.
     *
     * @param {object} event The event source of the callback
     * @param {object} child The react element that was selected
     */
    onChange: PropTypes.func,
    /**
     * Callback fired when the component requests to be closed.
     * Useful in controlled mode (see open).
     *
     * @param {object} event The event source of the callback
     */
    onClose: PropTypes.func,
    /**
     * Callback fired when the component requests to be opened.
     * Useful in controlled mode (see open).
     *
     * @param {object} event The event source of the callback
     */
    onOpen: PropTypes.func,
    /**
     * Control `select` open state.
     * You can only use it when the `native` property is `false` (default).
     */
    open: PropTypes.bool,
    /**
     * The input value, required for a controlled component.
     */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]),
};

SelectList.defaultProps = {
    subHeaderText: 'Choose Application',
    placeHolderText: 'Select Your Application'
}

export default withStyles(styles)(SelectList);