import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
  button: {
    background: 'linear-gradient( 90deg, rgb(43,156,216) 0%, rgb(48,183,255) 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient( 90deg, rgb(43,156,216) 100%, rgb(48,183,255) 0%)',
      opacity: 1,
    },
  },
};

function GradientButton(props) {
  const { color, type = 'button' } = props;

  return (
    <Button
      className={props.classes.button}
      type={type}
      style={{ color: color, borderColor: color }}
    >
      {props.children}
    </Button>
  );
}

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GradientButton);