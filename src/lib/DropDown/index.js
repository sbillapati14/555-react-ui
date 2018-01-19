import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Avatar from 'material-ui/Avatar';

const styles = {
    root: {
        display: 'flex',
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    popperClose: {
        pointerEvents: 'none',
    },
    bigAvatar: {
        width: 21,
        height: 20,
    },
    avatar: {
        marginRight: 15,
        marginLeft : 15
    },
};

class MenuListComposition extends React.Component {
    state = {
        open: false,
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleProfile = () =>{
        this.handleClose()
        console.log("profile clicked")
    }
    handleSetting = () => {
        this.handleClose()
        console.log("handleSetting")
    }
    handleLogout = () => {
        this.handleClose()
        console.log("handleLogout")
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;

    return (
        <div className={classes.root}>
          <Paper>
           </Paper>
            <Manager>
             <Target>
              <Button
               aria-owns={open ? 'menu-list' : null}
               aria-haspopup="true"
               onClick={this.handleClick}
         >

          Open Menu
         </Button>
         </Target>
         <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
         >
           <ClickAwayListener onClickAway={this.handleClose}>
                <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                    <Paper>
                        <MenuList style={{ width: 200 }}>
                            <MenuItem
                               onClick={
                               this.handleProfile
                            }
                    >
                    <div className={classes.row}>
                        <Avatar
                            alt="Remy Sharp"
                            className={classNames(classes.avatar, classes.bigAvatar)}
                            src="https://image.flaticon.com/icons/png/128/118/118781.png" className={classes.avatar} />
                        <p style={{ marginTop: 10 }}> Profile</p>
                    </div>
                    </MenuItem>
                    <MenuItem
                        onClick={this.handleSetting}
                    >
                    <div className={classes.row}>
                        <Avatar
                            alt="Remy Sharp"
                            className={classNames(classes.avatar, classes.bigAvatar)}
                            src="https://d30y9cdsu7xlg0.cloudfront.net/png/196271-200.png" className={classes.avatar} />
                        <p style={{ marginTop: 10 }}> Setting</p>
                    </div>
                    </MenuItem>
                    <MenuItem
                        onClick={this.handleLogout}
                    >
                      <div className={classes.row}>
                        <Avatar
                        alt="Remy Sharp"
                        className={classNames(classes.avatar, classes.bigAvatar)}
                        src="https://d30y9cdsu7xlg0.cloudfront.net/png/7237-200.png" className={classes.avatar} />
                        <p style={{ marginTop: 10 }}> Logout</p>
                        </div>
                    </MenuItem>
                     </MenuList>
                       </Paper>
                       </Grow>
                   </ClickAwayListener>
                </Popper>
            </Manager>
          </div>
       );
    }
}

export default withStyles(styles)(MenuListComposition);