import React from 'react';
import classNames from 'classnames';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Manager, Reference, Popper, } from 'react-popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = {
  root: {
    display: 'flex',
    zIndex: 10
  },
   carot: {
     position: 'absolute',
     marginLeft: '-0.5em',
     left: '40px',
     border: '0.5em solid black',
     borderColor: '#fff #fff #fff',
     transformOrigin: '0 0',
     transform: 'rotate(135deg)',
     zIndex: 9999,
     boxShadow: '-3px 3px 3px 0 rgba(0, 0, 0, 0.05)'
   },
   popperClose: {
     pointerEvents: 'none'
   },
   popperContent: {
     position: 'absolute',
     top: '61px',
     right: '40px'
   }
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
          <Reference>
            {({ targetProps }) => (
              <div {...targetProps} onClick={this.handleClick}>
                {this.props.button}
              </div>
            )}
          </Reference>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
           {({ ref, style, placement, arrowProps }) => (
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                <Paper className={classes.popperContent}>
                  <span className = {classes.carot}></span>
                  {this.props.render({handleClose: this.handleClose})}
                </Paper>
              </Grow>
            </ClickAwayListener>
           )}
          </Popper>
          </Manager>
      </div>
    );
  }
}

export default withStyles(styles)(Menu);