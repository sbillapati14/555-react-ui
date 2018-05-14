import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';

const styles = theme => ({
  wrapper: {
    display: 'inline-block'
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
  carot: {
    marginTop: '10px',
     position: 'relative',
     cursor: 'pointer',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0',
      right: '14px',
      borderBottom: '12px solid #999',
      borderLeft: '12px solid transparent',
      borderRight: '12px solid transparent'
    },
    '&:after': {
      content: '""',
      position: "absolute",
      top: '0',
      right: '15px',
      borderBottom: '14px solid #fff',
      borderLeft: '11px solid transparent',
      borderRight: '11px solid transparent'
    }
  }
});

class SimplePopover extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.wrapper}>
        {/* <Button variant="raised" onClick={this.handleClick}>
          Open Popover
        </Button> */}
        <div onClick={this.handleClick}>
        {this.props.Component}
        {Boolean(anchorEl) && <span className = {classes.carot}></span>}
        </div>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          classes = {{paper:classes.paper}}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {/* <Typography className={classes.typography}>The content of the Popover.</Typography> */}
          {this.props.children}
        </Popover>
      </div>
    );
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePopover);
