import React, { Component } from 'react';
import MuiToolbar from '@material-ui/core/Toolbar'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return ({
  toolbar: {
    backgroundColor: theme.palette.background.default
  }
})
}

class Toolbar extends Component {

  render() {
    const { classes, ...rest} = this.props
    return (
      <MuiToolbar className={classes.toolbar} {...rest} />
    );
  }
}

export default withStyles(styles)(Toolbar);