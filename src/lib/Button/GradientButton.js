import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GradientButton);
