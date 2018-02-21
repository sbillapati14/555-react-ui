import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import TextField from 'material-ui/TextField';
import PaperCard from '../PaperCard';

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
        return (
            <div id='Forms'>

                <PaperCard
                  title="Acme Application Details"
                  avatar={
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  }
                >
                  <form>
                    <label className={classes.formLabel}>App Domain</label>
                    <TextField
                      className={classes.root}
                      id="Example"
                      margin="normal"
                      defaultValue="Example"
                      fullWidth={true}
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row', paddingLeft: 17,
                      }}
                    />

                    <label className={classes.formFieldLabel}>Federation Type</label>
                    <TextField
                      className={classes.root}
                      id="Disabled"
                      fullWidth={true}
                      value="Disable input"
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row', paddingLeft: 17,
                      }}
                    />

                    <label className={classes.formFieldLabel}>App Key</label>
                    <TextField
                      className={classes.root}
                      id="name"
                      fullWidth={true}
                      defaultValue="None"
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row', paddingLeft: 17,
                      }}
                    />

                    <label className={classes.formFieldLabel}>App Secret</label>
                    <TextField
                      className={classes.root}
                      id="name"
                      fullWidth={true}
                      defaultValue="Default Value"
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row', paddingLeft: 17,
                      }}
                    />

                    <label className={classes.formFieldLabel}>App </label>
                    <TextField
                      className={classes.root}
                      id="name"
                      fullWidth={true}
                      defaultValue="jhfghjgssfshgjksgd@*$&nv"
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row', paddingLeft: 17,
                      }}
                    />

                  </form>
                </PaperCard>
            </div>
        );
    }
}

export default withStyles(styles)(FormField);
