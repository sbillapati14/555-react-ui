import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse';
import List, { ListItem, ListItemIcon, ListItemText, } from 'material-ui/List';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
     backgroundColor: '#182831',
     color:"#fff"
  },
  itemText: {
     textAlign:"left",
     color:"red"
  },
  selectedItemIcon: {
     color: '#fff'
  },
  listItem  : {
    color: '#fff',
    fontSize: '15',
    position: 'relative',
    transition: 'all 0.4s',
    marginBottom : 8,
  },
 activeListItem :{
    height: 58,
    color: '#fff',
    fontSize: '15',
    position: 'relative',
    transition: 'all 0.4s',
    marginBottom : 8,
    backgroundColor : "#253843",
 },
 subItemText: {
    color: '#fff',
    fontSize: '15',
    display: 'block',
    transition: 'all 0.4s', }
});

class NavSection extends Component {
    state = {
      open: false,
    }
    handleClick(){
      if(this.props.children){
        this.setState({ open: !this.state.open });
      }else {
        this.props.onCLick();
      }
    }

    render() {
        const { props, classes, children, leftIcon, label, to  } = this.props;
        return (
          <List className={classes.root} component="nav" >
            <ListItem onClick={this.handleClick.bind(this)} exact to={to} className={this.state.open ? classes.activeListItem : classes.listItem} >
              {
                leftIcon?<ListItemIcon>
                {leftIcon}
              </ListItemIcon>:null}
              <ListItemText disableTypography
                primary={<Typography className={classes.subItemText}>{label}</Typography>}/>
              {children?
                <ListItemIcon className={classes.selectedItemIcon}>
                {this.state.open ? <ArrowDropUp /> : <ArrowDropDown />}
              </ListItemIcon>:null}
            </ListItem>
            {
              children?
              <Collapse component="li" in={this.state.open}>
                {children}
              </Collapse>:null
            }
          </List>
        );
    }
}

NavSection.propTypes = {
  label: PropTypes.string.isRequired,
};

NavSection.defaultProps = {

}

export default withStyles(styles)(NavSection);