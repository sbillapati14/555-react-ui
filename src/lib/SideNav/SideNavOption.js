import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText, } from 'material-ui/List';
import Typography from 'material-ui/Typography';


const styles = theme => ({
   optionListItem: {
     backgroundColor: '#0e171c',
     marginBottom: '8px',
     display: 'block',
     height: '38px',
     lineHeight: '38px',
     padding: '0 14px 0 60px',
     opacity: '0.7',
     fontSize: '15px',
     position: 'relative',
   },
    subItemText: {
      color: '#fff',
      fontSize: '15px',
      display: 'block',
      transition: 'all 0.4s',
      opacity: 0.7,
    }
});

class NavOption extends Component {

    render() {
        const { classes, children, } = this.props;
        return (
          <ListItem className={classes.optionListItem}  onClick={this.props.onClick}>
            <ListItemText disableTypography
               primary={<Typography className={classes.subItemText}></Typography>}/>{children?children:"Child Text"}
          </ListItem>
        );
    }
}

NavOption.propTypes = {
};

NavOption.defaultProps = {

}

export default withStyles(styles)(NavOption);
