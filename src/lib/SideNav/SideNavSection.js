import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'material-ui/transitions/Collapse';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText, } from 'material-ui/List';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';

const styles = theme => {
  return {
    root: {
      flexDirection: 'column',
      fontSize: '15px',
      fontFamily: theme.typography.fontFamily,
      fontWeight: 600,
      padding: '0',
    },
    listItem: {
      cursor: 'pointer',
      display: 'flex',
      width: '100%',
      color: '#fff',
      position: 'relative',
      marginBottom: 8,
      height: '58px',
      padding: '0 0 0 62px',
      transition: 'all 0.4s',
    },
    listItemActive: {
      backgroundColor: "#253843",
    },
    label: {
      color: '#FFF',
      height: '58px',
      lineHeight: '58px',
      padding: 0,
      fontSize: 15,
      fontWeight: 600,
    },
    anchor: {
      textDecoration: 'none',
      padding: '0 16px',
    },
    leftIcon: {
      position: 'absolute',
      top: '31%',
      left: '18px',
      color: '#FFF',
      transform: 'scale(1.3)',
    },
    rightIconOpen:{
      position: 'absolute',
      right: 0,
      top: 16,
      color: '#fff',
      transform: 'rotate(0deg)',
      transition: 'transform 0.3s linear',
    },
    rightIconClose:{
      position: 'absolute',
      right: 0,
      top: 16,
      color: '#fff',
      transform: 'rotate(180deg)',
      transition: 'transform 0.3s linear',
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
    },
    collapsableMenu: {
        width: '100%',
        padding: '0 10px'
    }
  }
};

class SideNavSection extends Component {
  constructor(props){
    super(props);
    this.state = {open: true}
  }

  componentWillMount(){
    this.setState({open: this.props.open})
  }
  
  handleOnClick(e) {
    const { onClick } = this.props;
    this.setState({open: !this.state.open});
    if (onClick)
      onClick(e);
  }

  render() {
    const { classes, children, open, leftIcon, label, component: Component, ...rest } = this.props;

    let listItemClass = classes.listItem;
    let optionsClass = classes.options;
    if (open) {
      listItemClass += ` ${classes.listItemActive}`;
      optionsClass += ` ${classes.optionsActive}`
    }

    let text = <ListItemText classes={{ primary: classes.label }} primary={label} />;
    if (Component) {
      const anchorClass = `${classes.root} ${classes.label} ${classes.anchor}`;
      text = <Component {...rest} className={anchorClass} >{label}</Component>
    }
    const iconClass = this.state.open ? classes.rightIconOpen : classes.rightIconClose;
    return (
      <ListItem className={classes.root} onClick={(e) => this.handleOnClick(e)}>
        <div className={listItemClass}>

          {leftIcon && (
            <ListItemIcon className={classes.leftIcon}>
              {leftIcon}
            </ListItemIcon>
          )}

          {text}

          {children && <ListItemIcon className={iconClass}>
            <ArrowDropUp/>
          </ListItemIcon>}

        </div>
        <Collapse className={classes.collapsableMenu} component="div" in={this.state.open}>
          <List className={optionsClass} component="ul" >
            {children}
          </List>
        </Collapse>
      </ListItem>
    );
  }
}

SideNavSection.propTypes = {
  label: PropTypes.string.isRequired,
  open: PropTypes.bool,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

SideNavSection.defaultProps = {
  open: false,
}

export default withStyles(styles)(SideNavSection);