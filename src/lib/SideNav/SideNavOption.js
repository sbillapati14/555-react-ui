import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText, } from 'material-ui/List';

const styles = theme => ({
  root: {
    verticalAlign: 'baseline',
    padding: 0,
  },
  listItem: {
    '&:first-child': {
      backgroundColor: '#0e171c',
      opacity: '0.7',
      marginBottom: '8px',
      display: 'block',
      height: '38px',
      lineHeight: '38px',
      padding: '0 14px 0 60px',
      fontSize: '15px',
      position: 'relative',
      color: '#FFF',
    }
  },
  listItemActive: {
    '&:first-child': {
      backgroundColor: '#0e171c',
      opacity: '1',
      marginBottom: '8px',
      display: 'block',
      height: '38px',
      lineHeight: '38px',
      padding: '0 14px 0 60px',
      fontSize: '15px',
      position: 'relative',
    },
    '&:before': {
      content: '""',
      display: 'block',
      width: '4px',
      height: '38px',
      position: 'absolute',
      left: 0,
      top: 0,
      background: '#2b9cd8',
    }
  },
  subItemText: {
    color: '#fff',
    fontSize: '15px',
    display: 'block',
    transition: 'all 0.4s',
    opacity: 0.7,
  }
});

class SdieNavOption extends Component {

  render() {
    const { classes, active, primary, component, ...rest } = this.props;

    let listItemClass = classes.listItem;
    if (active)
      listItemClass = classes.listItemActive;

    return (
      <ListItem component={component} {...rest} classes={{ root: classes.root }} onClick={this.props.onClick}>
        <ListItemText disableTypography classes={{ root: listItemClass }}
          primary={primary} />
      </ListItem>
    );
  }
}

SdieNavOption.propTypes = {
  primary: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default withStyles(styles)(SdieNavOption);
