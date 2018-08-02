import React from 'react';
import classNames from 'classnames';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/corePaper';
import { withStyles } from '@material-ui/core/styles';
import { Manager, Target, Popper, } from 'react-popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = {
  root: {
    display: 'flex',
    zIndex: 10
  },
  popperClose: {
    pointerEvents: 'none',
  },
};

class Menu extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Manager>
          <Target>
            {({ targetProps }) => (
              <div {...targetProps} onClick={this.handleClick}>
                {this.props.button}
              </div>
            )}
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  {this.props.render({handleClose: this.handleClose})}
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

export default withStyles(styles)(Menu);