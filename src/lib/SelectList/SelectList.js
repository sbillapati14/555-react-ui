import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = theme => ({
    root: {
        width: '238px',
        color: '#606060',
        fontSize: 13,
        position: 'relative',
    },
    fullWidth: {
        width: '100%',
        color: '#606060',
        fontSize: 13,
        position: 'relative',
    },
    selectedItem: {
        width: '100%',
        borderRadius: '5px',
        height: 45,
        color: '#ddd',
        fontSize: 15,
        lineHeight: 45,
        padding: '0 0 0 17px',
        position: 'relative',
        margin: 0,
        backgroundColor: 'rgb(244, 244, 244)',
        justifyContent: 'left',
    },
    selectedItemOpen: {
        borderRadius: '5px 5px 0 0',
    },
    selectedItemIcon: {
        marginRight: 0,
        color: '#ddd'
    },
    icon: {
        position: 'absolute',
        right: 3,
    },
    listItemsContainer: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '0 0 5px 5px',
        position: 'absolute',
        zIndex: 1,
    },
    subHeaderText: {
        color: '#282828',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: '17px',
    },
    selectedItemText: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 15,
        fontWeight: 600,
        display: 'block',
        transition: 'all 0.4s',
    },
    primaryRoot: {
        color: "#fff"
    },
    primarySelectedItem: {
        color: '#fff',
        backgroundImage: '-webkit-linear-gradient( 0deg, rgb(43,156,216) 0%, rgb(48,183,255) 100%)'
    },
    primarySelectedItemText: {
        color: '#fff'
    },
    options: {
        paddingTop: 0,
    },
    wrapper: {
        maxHeight: '250px',
        overflow: 'auto'
    }
});


class SelectList extends Component {

    state = {
        open: false,
    }

    toggleDropDown = (e) => {
        this.setState({ open: !this.state.open });
    }

    closeDropDown = (e) => {
        if (this.state.open)
            this.setState({ open: false });
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
        const {
          classes,
          placeHolderText,
          subHeaderText,
          children,
          id,
          value,
          fullWidth,
          primary,
          // name
        } = this.props;

        const selectListId = `selectListId-${id || Math.random().toString(36).substr(2, 9)}`;

        let selectedItemClass = classes.selectedItem;
        if (this.state.open)
            selectedItemClass += ` ${classes.selectedItemOpen}`

        let selected = placeHolderText;
        const items = React.Children.map(children, (child, index) => {

            if (!React.isValidElement(child)) {
                return null;
            }

            let isSelected = value === child.props.value;
            if (isSelected)
                selected = child.props.children;


            return React.cloneElement(child, {
                role: 'option',
                key: index + 1,
                selected: isSelected,
                onClick: this.handleItemClick(child),
            });
        });

        items.unshift(<ListSubheader key={0} classes={{ root: classes.subHeaderText }}
            component='p' disableSticky >
            {subHeaderText}
        </ListSubheader>);

        let rootClass = fullWidth ? classes.fullWidth : classes.root
        let selectedItemTextClass = classes.selectedItemText

        if (primary) {
            rootClass += ` ${classes.primaryRoot}`
            selectedItemClass += ` ${classes.primarySelectedItem}`
            selectedItemTextClass += ` ${classes.primarySelectedItemText}`
        }

        return (
            <ClickAwayListener onClickAway={this.closeDropDown}>
                <div id={selectListId} className={rootClass}>
                    <Button disableRipple={true} className={selectedItemClass} onClick={this.toggleDropDown} fullWidth={fullWidth}>
                        <Typography className={selectedItemTextClass}>{selected}</Typography>
                        {this.state.open ? <ArrowDropUp className={classes.icon} /> : <ArrowDropDown className={classes.icon} />}
                    </Button>
                    <Collapse component="div" in={this.state.open} classes={{wrapper: classes.wrapper}} className={classes.listItemsContainer}>
                        <List component="ul" classes={{ root: classes.options }}>
                            {items}
                        </List>
                    </Collapse>
                </div>
            </ClickAwayListener>
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
    fullWidth: PropTypes.bool,
};

SelectList.defaultProps = {
    subHeaderText: 'Selection Options',
    placeHolderText: 'Make Selection',
    fullWidth: false,
    primary: false,
}

export default withStyles(styles)(SelectList);
