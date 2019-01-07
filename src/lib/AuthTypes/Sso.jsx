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
  pageWrapper: {
    transform : 'translateX(50%)'
  }
})

const AuthTypesSSO = (props) => {
  const { title, formContent, classes } = props;
  return (
    <PaperCard title= {title} >
        {formContent.map((item, index)=>{
          return(
        <FormField key={index} classes={{root: classes.root}} id={item.id} label={item.label} placeholder={item.placeholder} />
        )})}
        <Button className={classes.btn}>Save</Button>
    </PaperCard>
  )
}


AuthTypesSSO.defaultProps = {
  formContent : [
    {item: 'SSO Verification Server ...' , index:1},
  ]
}

export default withStyles(styles)(AuthTypesSSO);
