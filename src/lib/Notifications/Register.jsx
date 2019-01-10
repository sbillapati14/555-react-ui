import React from 'react';
import { FormField } from '../InputFields';
import Button from '@material-ui/core/Button';
import PaperCard from '../PaperCard';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root:{
    opacity: '1',
    border: '1px solid #ccc',
    '&:focus-within': {
       border: '1px solid #66afe9',
       boxShadow:'0 0 0 0.2rem rgba(0,123,255,.25)'
    },
    ':disabled': {
      backgroundColor: '#ccc',
      boxShadow:'0 0 0 0.2rem rgba(0,123,255,.25)'
   },
  },
  btn:{
    marginTop: '20px'
  },
  lineText: {
    width: '80%',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    color: '#ccc',
    lineHeight: '0.1em',
    margin: '10px auto',
    fontSize: '14px'
 },
 line: {
     background:'#fff',
     padding:'0 10px'
 },
 prod: {
     marginLeft: '-9px',

 },
 checked: {
     position: 'relative',
     margin: '4px 0 0',
     marginLeft: '-12px',
     top: '11px'
 },
 pageWtrapper:{
    fontSize: '14px',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
 }
});


const Register = (props) => {
const { notification, apnKeys, apnTokenAuth, apn_fcm_gcm, classes } = props;
return (
  <div className={classes.pageWtrapper}>


  <PaperCard title= "Notification Keys">
  <span>APN -- Certificate/Key</span>
  <form>
  <FormField type="file" id="upload" placeholder="Certificate"/>
  <FormField type="file" id="upload" placeholder="Key" />
  </form>
  <br/>
      <h2 className={classes.lineText}><span className={classes.line}> OR </span></h2>
      <br/>
  APN - Token Auth
  <FormField type="text"  classes={{root: classes.root}} placeholder="APN Certificate" />
  <FormField  type="text" classes={{root: classes.root}} placeholder= "APN Key" />
  <br/><br/>
  <span>Private Key File</span>
  <FormField type="file" id="upload" placeholder= "Private Key File" />
      <div className={classes.checked}>  <Checkbox  color="default" value="checked" />    <span className={classes.prod}>Production</span></div>
      <Button className={classes.btn}>Register APN</Button>

      <br/><br/>


  <FormField type="text" classes={{root: classes.root}} label="FCM/GCM" placeholder="FCM/GCM Key" />
      <Button className={classes.btn}>Register FCM/GCM</Button>

      </PaperCard>
  </div>
)
}

Register.defaultProps = {
  apnKeys : [
    {title: 'apnKeys1'}
  ],
  apnTokenAuth : [
    {title: 'apnTokenAuth1'}
  ],
  apn_fcm_gcm : [
    {title:'apn_fcm_gcm1'}
  ]
}

export default withStyles(styles)(Register);