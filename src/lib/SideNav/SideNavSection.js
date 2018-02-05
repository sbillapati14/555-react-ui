import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse';
import List, { ListItem, ListItemIcon, ListItemText, } from 'material-ui/List';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    backgroundColor: '#182831',
    color: "#fff"
  },
  itemText: {
    textAlign: "left",
    color: "red"
  },
  selectedItemIcon: {
    color: '#fff'
  },
  listItem: {
    color: '#fff',
    fontSize: '15',
    position: 'relative',
    transition: 'all 0.4s',
    marginBottom: 8,
  },
  activeListItem: {
    height: 58,
    color: '#fff',
    fontSize: '15',
    position: 'relative',
    transition: 'all 0.4s',
    marginBottom: 8,
    backgroundColor: "#253843",
  },
  subItemText: {
    color: '#fff',
    fontSize: '15',
    display: 'block',
    transition: 'all 0.4s',
  }
});

class NavSection extends Component {

  handleClick() {
    if (this.props.children) {
      this.setState({ open: !this.props.open });
    } else {
      this.props.onCLick();
    }
  }

  render() {
    const { classes, children, leftIcon, label, to } = this.props;
    return (
      <ListItem component="li">
        {leftIcon && <ListItemIcon>
          {leftIcon}
        </ListItemIcon>}
        <ListItemText primary={label} />
        {children ?
          <ListItemIcon className={classes.selectedItemIcon}>
            {this.props.open ? <ArrowDropUp /> : <ArrowDropDown />}
          </ListItemIcon> : null}

        <List className={classes.root} component="ul" >
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