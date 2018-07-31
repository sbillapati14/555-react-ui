import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// We can inject some CSS into the DOM.
const styles = {
  button: {
    background: 'transparent',
    borderColor: 'white',
    color: 'white',
    border: '1px solid',
    '&:hover': {
      background: 'transparent',
      opacity: 0.7,
    },
  },
};

function OutlinedButton(props) {
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

OutlinedButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButton);