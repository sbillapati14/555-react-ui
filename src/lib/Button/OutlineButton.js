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
  const { classes, color, id, ...rest } = props;
  const buttonId = `buttonId-${id || Math.random().toString(36).substr(2, 9)}`;

  return (
    <Button
      id={buttonId}
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
