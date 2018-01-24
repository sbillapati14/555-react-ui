import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Switch from 'material-ui/Switch';
import withStyles from "material-ui/styles/withStyles";

const styles =  {
  bar: {
          height: 24,
          width : 45,
          borderRadius : 80,
          marginTop: -11,
          backgroundColor: "#cccccc",

      },
      checked: {
          color: "#fff",
          '& + $bar': {
              backgroundColor: "#03ba8d",
          },
          width:68,

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



