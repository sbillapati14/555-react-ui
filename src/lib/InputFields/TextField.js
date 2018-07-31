import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';


const styles = theme => ({
    root : {
      background: '#f5f5f5',
      border: 'none',
      outline: 'none',
      borderRadius: 5,
      height: 39,
      fontSize: 14,
      color: '#606060',
    }
});

class TextField extends React.Component {
  render() {
  const { classes } = this.props;
    return (
      <MuiTextField className={classes.root}
        { ...this.props }
      >
      </MuiTextField>
    );
  }
}

TextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextField);