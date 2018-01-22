import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Switch from 'material-ui/Switch';
import withStyles from "material-ui/styles/withStyles";

class SwitchLabels extends React.Component {
  state = {
    checked: true,
    checked: false,
  };

  render() {
  const { classes } = this.props;
    return (

       <Switch
           checked={this.state.checked}
           onChange={(event, checked) => this.setState({ checked: checked })}
         />
    );
  }
}


SwitchLabels.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles()(SwitchLabels);



