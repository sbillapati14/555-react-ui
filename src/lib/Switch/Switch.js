import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Switch from 'material-ui/Switch';
import withStyles from "material-ui/styles/withStyles";

const styles =  {
  bar: {
    backgroundColor: "#cccccc",
    display: "block",
    width: 57,
    height: 33,
    borderRadius: 33,

  },

  checked: {
    color: "#fff",
    display: "block",
    width: 57,
    height: 33,
    borderRadius: 33,
    position: "absolute",

    '& + $bar': {
      width:60,
      backgroundColor: "#03ba8d",
    },
  },
};

class Switches extends React.Component {
  state = {
    checked: true,
    checked: false,
    checked: true,
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Switch
          classes={{
            checked: classes.checked,
            bar: classes.bar,
          }}
          checked={this.state.checked}
          onChange={this.handleChange('checked')}
        />
      </div>
    );
  }
}

Switches.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Switches);



