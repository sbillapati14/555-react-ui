import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'material-ui/Switch';
import withStyles from "material-ui/styles/withStyles";

const styles = theme => ({
      switchField: {
        margin: '0 0 10px 0',
        overflow: 'hidden'
      },
      label:{
        display: 'inline-block',
        width: '45px',
        fontSize: '14px',
        fontWeight: 'normal',
        textAlign: 'center',
        textShadow: 'none',
        padding: '8px 9px',
        borderRadius: '3px',
        transition:  'all 0.1s ease-in-out',
        '&:hover': {
           cursor: 'pointer'
          },
      },
      radioSwitch:{
        position: 'absolute !important',
        clip: 'rect(0, 0, 0, 0)',
        height: '1px',
        width: '1px',
        border: '0',
        overflow: 'hidden',
        '&:checked[value="yes"] + label': {
            backgroundColor: '#2fb3fa',
            boxShadow: 'none',
            color: '#fff',
            width: '45px'
        },
        '&:checked[value="no"] + label': {
            backgroundColor: '#DA4F49',
            boxShadow: 'none',
            color: '#fff',
        }
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
    onChange && onChange(!this.state. checked)
    this.setState({checked: !this.state.checked})
  }

  render() {
    const { classes, name, values, labelText } = this.props;

    return (
      <form className={classes.btnContainer}>
         <div className={classes.switch}>
            <input className={classes.radioSwitch} type="radio" id="switch_left" name={name} value="yes" onChange={this.handleChange} checked={this.state.checked}/>
             <label className={classes.label} htmlFor="switch_left">{values.on}</label>
            </div>
            <div className={classes.switch}>
              <input className={classes.radioSwitch} type="radio" id="switch_right" name={name} onChange={this.handleChange} value="no" checked={!this.state.checked}/>
              <label className={classes.label} htmlFor="switch_right">{values.off}</label>
            </div>
           {labelText && <span>  -  Ids</span>}
      </form>
    );
  }
}

SwitchButton.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.String,
  values: PropTypes.object
};

SwitchButton.defaultProps = {
   name : 'radio_switch',
   values : { on: "ON", off: "OFF"}
}

export default withStyles(styles)(SwitchButton);



