import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    padding: '.5em',
    backgroundColor: '#f2dede',
    color: '#a94442',
    marginBottom: '.5em'
  },
};

function ErrorAlert(props) {
  const { classes, key, message } = props;

  return (
    <div key={key} className={classes.root} >
      {message}
    </div>
  );
}

ErrorAlert.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorAlert);