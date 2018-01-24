import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Switch from 'material-ui/Switch';
import withStyles from "material-ui/styles/withStyles";
import green from 'material-ui/colors/green';

const styles =  {
  bar: {
      backgroundColor: "#cccccc",
      width: 57,
      height: 33,
      borderRadius: 33,
      position: "absolute",
      left:16,
      top: 24,
    },
    icon: {
      display: "block",
      position: "absolute",
      top: 3,
      left: 6,
      width: 26,
      height: 26,
      marginTop: 17,
    },

    checked: {
      color: "#fff",
      '& + $bar': {
        backgroundColor: "#03ba8d",
        width: 57,
        height: 33,
        borderRadius: 33,
        opacity: 1,
      },
      left: 4,
    },
  };


class Switches extends React.Component {
  state = {
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
            icon: classes.icon,
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



