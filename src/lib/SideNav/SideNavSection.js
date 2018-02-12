import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText, } from 'material-ui/List';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';

const styles = theme => {
  return {
    root: {
      flexDirection: 'column',
      fontSize: '15px',
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeighthHevey,
      padding: '0',
    },
    listItem: {
      cursor: 'pointer',
      display: 'flex',
      width: '100%',
      color: '#fff',
      position: 'relative',
      transition: 'all 0.4s',
      marginBottom: 8,
      height: '58px',
      padding: '0 0 0 62px',
    },
    listItemActive: {
      backgroundColor: "#253843",
    },
    label: {
      color: '#FFF',
      height: '58px',
      lineHeight: '58px',
      padding: 0,
    },
    anchor: {
      textDecoration: 'none',
      padding: '0 16px',
    },
    leftIcon: {
      position: 'absolute',
      top: '31%',
      left: '18px',
      color: '#FFF'
    },
    rightIcon: {
      position: 'absolute',
      right: 0,
      top: 16,
      color: '#fff',
      transition: theme.transitions.create(['all']),
    },
    itemText: {
      textAlign: "left",
      color: "red"
    },
    options: {
      padding: 0,
      backgroundColor: '#182831',
      width: '100%',
      color: "#fff",
      display: 'none',
      lineHeight: '38px',
    },
    optionsActive: {
      display: 'block'
    }
  }
};

class NavSection extends Component {

  state = {
    open: false,
  }

  constructor(props) {
    super(props);

    if (props.open && props.open !== undefined)
      this.state.open = props.open;
  }

  handleClick(e) {
    if (this.props.children) {
      this.setState({ open: !this.state.open });
    } else {
      if (this.props.onCLick)
        this.props.onCLick();
    }
  }

  render() {
    const { classes, children, leftIcon, label, component: Component, ...rest } = this.props;
    const { open } = this.state;

    let listItemClass = classes.listItem;
    let optionsClass = classes.options;
    if (open) {
      listItemClass += ` ${classes.listItemActive}`;
      optionsClass += ` ${classes.optionsActive}`
    }

    let text = <ListItemText classes={{ primary: classes.label }} primary={label} />;
    if (Component) {
      const anchorClass = `${classes.root} ${classes.label} ${classes.anchor}`;
      text = <Component {...rest} className={anchorClass}>{label}</Component>
    }

    return (
      <ListItem className={classes.root} onClick={(e) => this.handleClick(e)}>
        <div className={listItemClass}>

          {leftIcon && (
            <ListItemIcon className={classes.leftIcon}>
              {leftIcon}
            </ListItemIcon>
          )}

          {text}

          {children && <ListItemIcon className={classes.rightIcon}>
            {this.props.open ? <ArrowDropUp /> : <ArrowDropDown />}
          </ListItemIcon>}

        </div>
        <List className={optionsClass} component="ul" >
          {children}
        </List>
      </ListItem>
    );
  }
}

NavSection.propTypes = {
  label: PropTypes.string.isRequired,
  open: PropTypes.bool,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

NavSection.defaultProps = {
  open: false,
}

export default withStyles(styles)(NavSection);