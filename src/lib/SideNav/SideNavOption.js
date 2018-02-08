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

class NavOption extends Component {

  render() {
    const { classes, active } = this.props;

    let listItemClass = classes.listItem;
    if (active)
      listItemClass = classes.listItemActive;

    return (
      <ListItem component="li" classes={{ root: classes.root }} onClick={this.props.onClick}>
        <ListItemText disableTypography classes={{ root: listItemClass }}
          primary={this.props.primary} secondary={this.props.secondary} />
      </ListItem>
    );
  }
}

NavOption.propTypes = {
  disableTypography: PropTypes.boolean,
  primary: PropTypes.node,
  secondary: PropTypes.node,
};

NavOption.defaultProps = {
  disableTypography: false,
}

export default withStyles(styles)(NavOption);
