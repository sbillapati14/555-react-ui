import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from "material-ui/styles/withStyles";

const styles = theme => ({
      label:{
        display: 'inline-block',
        width: '45px',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '14px',
        fontWeight: 'normal',
        textAlign: 'center',
        textShadow: 'none',
        padding: '8px 10px',
        borderRadius: '3px',
        transition:  'all 0.1s ease-in-out',
        '&:hover': {
           cursor: 'pointer'
          },
      },
      onLabel: {
        backgroundColor: '#2fb3fa',
        color: '#fff'
      },
      offLabel: {
        backgroundColor: '#DA4F49',
        color: '#fff'
      },
      switch:{
          marginRight: '10px',
          display: 'inline-block'
      },
      btnContainer : {
          margin : '20px 0'
      }
  });


class SwitchButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = { checked: props.checked || false };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(){
    const { onChange }  = this.props;
    onChange && onChange(!this.state.checked)
    this.setState({checked: !this.state.checked})
  }

  render() {
    const { classes, values, labelText } = this.props;
    const onLabel = classNames({ [classes.onLabel] :this.state.checked}, classes.label );
    const offLabel = classNames({ [classes.offLabel] :!this.state.checked}, classes.label );
    return (
      <form className={classes.btnContainer}>
         <div className={classes.switch}>
            <label className={onLabel}  htmlFor="switch_on" onClick={this.handleChange}>{values.on}</label>
            </div>
            <div className={classes.switch}>
              <label className={offLabel} htmlFor="switch_off" onClick={this.handleChange}>{values.off}</label>
            </div>
           {labelText && <span> {labelText}</span>}
      </form>
    );
  }
}

SwitchButton.propTypes = {
  classes: PropTypes.object.isRequired,
//  name: PropTypes.String,
  values: PropTypes.object
};

SwitchButton.defaultProps = {
//   name : 'radio_switch',
   values : { on: "ON", off: "OFF"}
}

export default withStyles(styles)(SwitchButton);



