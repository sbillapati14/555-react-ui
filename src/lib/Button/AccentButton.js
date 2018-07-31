import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// We can inject some CSS into the DOM.
const styles = {
  button: {
    background: 'white',
    color: '#2fb3fa',
    '&:hover': {
      background: 'white',
      opacity: 0.7,
    },
  },
};

function AccentButton(props) {
  const { classes, color, ...rest } = props;

  return (
    <Button
      className={classes.button}
      style={{ color: color, borderColor: color }}
      {...rest}
    >
      {props.children}
    </Button>
  );
}

AccentButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccentButton);