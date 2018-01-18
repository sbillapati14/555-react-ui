import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

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
  const { color } = props;

  return (
    <Button
      className={props.classes.button}
      style={{ color: color, borderColor: color }}
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