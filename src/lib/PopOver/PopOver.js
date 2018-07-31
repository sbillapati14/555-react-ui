import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
//import { Manager, Target, Popper, } from 'react-popper';
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
      {/*<Manager>
        <Target>
         <div onClick={this.handleClick}>
           {this.props.Component}
        </div>
        </Target>
       <Popper
          placement="bottom-end"
          eventsEnabled={open}
          className={classNames({ [classes.popperClose]: !open}, classes.popper)}
        >
          <ClickAwayListener onClickAway={this.handleClose}>
            <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
              <Paper>
                <span className = {classes.carot}></span>
                {this.props.children}
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>*/}
    </div>
    );
  }
}

PopoverDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopoverDropdown);
