import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
     root : {
       background: '#f5f5f5',
       border: 'none',
       outline: 'none',
       borderRadius: 5,
       height: 39,
       fontSize: 14,
       color: '#606060',
     },

    formLabel: {
      color: '#282828',
      display: 'inline-block',
      marginTop: 16,
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',

    },
    formFieldLabel: {
      color: '#282828',
      display: 'inline-block',
      marginTop: 16,
      marginBottom: 16,
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',

    },
});

class FormField extends Component {
    render() {
        const {classes} = this.props
          if(this.props.component) {
       return (this.props.component);
      } else {
        return (
            <div>
                <label className={classes.formLabel}>{this.props.label}</label>
                <TextField
                  className={classes.root}
                  disabled={this.props.disable}
                  id={this.props.id}
                  margin="normal"
                  defaultValue={this.props.default}
                  fullWidth={true}
                  InputProps={{
                    disableUnderline: true
                  }}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row', paddingLeft: 17,
                  }}
                />
            </div>
            );
          }
    }
}

export default withStyles(styles)(FormField);