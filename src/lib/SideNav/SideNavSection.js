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
      padding: '0',
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
      top: 13,
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

  handleClick() {
    if (this.props.children) {
      this.setState({ open: !this.props.open });
    } else {
      this.props.onCLick();
    }
  }

  render() {
    const { classes, children, leftIcon, label, open } = this.props;

    let listItemClass = classes.listItem;
    let optionsClass = classes.options;
    if (open) {
      listItemClass += ` ${classes.listItemActive}`;
      optionsClass += ` ${classes.optionsActive}`
    }

    return (
      <ListItem component="li" className={classes.root}>
        <div className={listItemClass}>

          {leftIcon && (
            <ListItemIcon className={classes.leftIcon}>
              {leftIcon}
            </ListItemIcon>
          )}

          <ListItemText classes={{ primary: classes.label }} primary={label} />

          <ListItemIcon className={classes.rightIcon}>
            {this.props.open ? <ArrowDropUp /> : <ArrowDropDown />}
          </ListItemIcon>

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
};

NavSection.defaultProps = {
  open: false,
}

export default withStyles(styles)(NavSection);