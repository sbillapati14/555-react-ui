import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import { Manager, Reference, Popper, } from 'react-popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';



const styles = theme => ({
   root: {
       display: 'flex',
       zIndex: 10
    },
   carot: {
      position: 'absolute',
      marginLeft: '-0.5em',
      right: '3px',
      border: '0.5em solid black',
      borderColor: '#fff #fff #fff',
      transformOrigin: '0 0',
      transform: 'rotate(135deg)',
      zIndex: 9999,
      boxShadow: '-3px 3px 3px 0 rgba(0, 0, 0, 0.05)',
   },
   popperClose: {
     pointerEvents: 'none',
   },
   popper: {
     zIndex: 10
   },
   popperContent:{
     position: 'absolute',
     top: '55px',
     left: 0
   }
});

class PopoverDropdown extends React.Component {
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
        {({ ref }) => (
                 <div onClick={this.handleClick}>
                 {this.props.Component}
              </div>
      )}

        </Reference>
        <Popper 
        placement="bottom-end"
        eventsEnabled={true}
        modifiers={{ preventOverflow: { enabled: false } }}
        positionFixed={false}
        className={classNames({ [classes.popperClose]: !open}, classes.popper)}>
        {({ ref, style, placement, arrowProps }) => (
          <ClickAwayListener onClickAway={this.handleClose}>
          <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
            <Paper className={classes.popperContent} ref={ref} data-placement={placement}>
              <span className = {classes.carot}></span>
              {this.props.children}
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

PopoverDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopoverDropdown);

// opacity: 0;
//     transform: scale(1, 1) translateZ(0px);
//     transform-origin: 0px 0px 0px;
//     position: absolute;
//     top: 0px;
//     left: 0px;
//     pointer-events: none;
//     transition: opacity 332ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 221ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
// }