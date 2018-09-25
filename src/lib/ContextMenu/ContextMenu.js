import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    position: 'relative',
    width: 'fit-content',
  },
  childrenContainer: {
    position: 'absolute',
    right: '-3.5em',
    zIndex: '2',
    transform: 'scale(0, 0)',
    transformOrigin: 'left top',
    transition: 'all 0.25s linear',
    '&.show': {
      transform: 'scale(1, 1)',
      transformOrigin: 'left top',
      transition: 'all 0.25s linear',
    },
    background: 'white',
    borderRadius: '0.25em',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
  },
  children: {
    padding: '0.5em',
    '& > *': {
      marginBottom: '0.25em',
      '&:last-child': {
        marginBottom: '0',
      },
    },
  }
});

class ContextMenu extends Component {

  state = {
    open: false,
  }

  render() {
    const { anchor, children, classes } = this.props;
    const childrenContainerClass = `${classes.childrenContainer} ${this.state.open ? 'show' : ''}`

    return (
      <ClickAwayListener onClickAway={() => this.setState({ open: false })} >
        <div
          className={classes.root}
          onContextMenu={event => {
            event.preventDefault();
            event.stopPropagation();

            this.setState({ open: true });
          }}
        >
          {anchor}
          <div className={childrenContainerClass} >
            <div className={classes.children} children={children} />
          </div>
        </div>
      </ClickAwayListener>
    );
  }
}

ContextMenu.propTypes = {
  anchor: PropTypes.element.isRequired,
};

export default withStyles(styles)(ContextMenu);