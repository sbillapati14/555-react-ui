import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
     root : {
       background: '#f5f5f5',
       border: 'none',
       outline: 'none',
       borderRadius: 5,
       minHeight: 39,
       height: 'auto',
       fontSize: 14,
       color: '#606060',
     },

    formLabel: {
      color: '#282828',
      display: 'inline-block',
      marginTop: 16,
      fontSize: 16,
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
      const { classes, component, label, style, ...rest} = this.props
      if(component) {
        if (label) {
          return (
            <div>
              <label className={classes.formLabel}>{label}</label>
              {component}
            </div>
          )
        } else {
          return component
        }
      } else {
        const combinedStyle = { alignItems: 'center', flexDirection: 'row', paddingLeft: 17, ...style }

        return (
            <div>
                <label className={classes.formLabel}>{label}</label>
                <TextField
                    margin="normal"
                    fullWidth={true}
                    InputProps={{
                        disableUnderline: true
                    }}
                    style={combinedStyle}

                    {...rest }
                    
                    className={classes.root}
                />
            </div>
            );
          }
    }
}

export default withStyles(styles)(FormField);