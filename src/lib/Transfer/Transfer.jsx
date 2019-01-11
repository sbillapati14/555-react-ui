import React from 'react';
import { FormField } from '../InputFields';
import Button from '@material-ui/core/Button';
import PaperCard from '../PaperCard';
import { withStyles } from '@material-ui/core/styles';
import Icon from '../../icons';


const styles = theme => ({
    root:{
      opacity: '1',
      border: '1px solid #ccc',
      '&:focus-within': {
         border: '1px solid #66afe9',
         boxShadow:'0 0 0 0.2rem rgba(0,123,255,.25)'
      },
    },
    btn:{
        margin: '0 20px 0 40px'
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
     formFieldWrapper:{
         width: '70%',
         display: 'inline-block'
     },
     copyClip: {
         cursor: 'pointer',
         borderLeft: '1px solid #aaa',
         paddng:'9px 12px',
         backgroundColor: '#eee'
     }
  });



{/*const Transfer = (props) => {

const {userEmail, userName, ownerId, copyToClipboard, classes} = props;*/}

class Transfer extends React.Component{

  constructor(props){
      super(props);
     // this.copyToSelf=this.copyToSelf.bind(this);
  }
  /*copyToSelf() {
    var copyText = document.getElementById(this.props.id);
    copyText.select();
    document.execCommand("copy");
  }*/

  copyToClipboard(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
  }

  render() {
  
    const {userEmail, userName, ownerId, copyToClipboard, classes} = this.props;
    
    return (
        <div>
        
        <PaperCard title= 'Current Owner'>
            <FormField classes={{root: classes.root}} id="userEmail" label="User Email" 
            endAdornment={<span className={classes.copyClip} onClick={()=>this.copyToClipboard("userEmail")}><Icon icon="copyIcon" width= '15' height= '15' viewBox="0 0 500 500" fill="#282828"/></span>}
            value={userEmail} />
            <FormField classes={{root: classes.root}} id="userName" label="User Name"  disabled={true}
            endAdornment={<span className={classes.copyClip} onClick={()=>this.copyToClipboard("userName")}><Icon icon="copyIcon" width= '15' height= '15' viewBox="0 0 500 500" fill="#282828"/></span>}
            value={userName} />
            <FormField classes={{root: classes.root}} id="ownerId" label="Owner Id"  disabled={true}
            endAdornment={<span className={classes.copyClip} onClick={()=>copyToClipboard("ownerId")}><Icon icon="copyIcon" width= '15' height= '15' viewBox="0 0 500 500" fill="#282828"/></span>}
            value={ownerId} />

        </PaperCard>

        <PaperCard title= 'Transfer To'>
            <div>
                <FormField classes={{root: classes.root, formFieldWrapper: classes.formFieldWrapper}} label="Portal User"  placeholder="Type in User Email" />
                <Button className={classes.btn}>Transfer</Button>
            </div>
            <br/>
            <h2 className={classes.lineText}><span className={classes.line}> OR </span></h2>
            <br/>
            <div className={classes.fieldWrapper}>
                <FormField classes={{root: classes.root, formFieldWrapper: classes.formFieldWrapper}} label="Team"  placeholder="Type in Team's Name" />
                <Button className={classes.btn}>Transfer</Button>
            </div>

        </PaperCard>

    </div>
    )
    }
}

export default withStyles(styles)(Transfer);