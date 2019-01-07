import React from 'react';
import { FormField } from '../InputFields';
import Button from '@material-ui/core/Button';
import PaperCard from '../PaperCard';
import { withStyles } from '@material-ui/core/styles';

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
      marginTop: '20px'
    },
    textArea:{
      display: 'block',
      width: '100%',
      height: 'auto',
      padding: '6px 12px',
      marginTop: '5px',
      resize: 'none',
      fontSize: '14px',
      lineHeight: '1.42857',
      color: '#555555',
      backgroundColor: 'white',
      backgroundImage: 'none',
      border: '1px solid #CCCCCC',
      boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)'
    },
  })

  
const AuthTypesTokenExchange = (props) => {
  const {formContent, title, classes, show, handleClick} = props;
  return (
    <PaperCard title= {title}>
                <Button className={classes.btn} onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
                {show ?
                <textarea className={classes.textArea} type="text" id="applicationName" rows="8" placeholder="Enter public key" ></textarea> : null
                }
                {formContent.map((item, index)=>{
                    return(
                    <FormField key={index} classes={{root: classes.root}} id={item.id} label={item.label} placeholder={item.placeholder} />
                    )
                })}
            <Button className={classes.btn}>Save</Button>
        </PaperCard>
  )
}

AuthTypesTokenExchange.defaultProps = {
  formContent : [
    {item: "TE1", index: 1}
  ]
}

export default withStyles(styles)(AuthTypesTokenExchange);