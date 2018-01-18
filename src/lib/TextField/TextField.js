import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MuiTextField from 'material-ui/TextField';


const styles = theme => ({
});

class TextField extends React.Component {
  render() {
    return (
      <MuiTextField 
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