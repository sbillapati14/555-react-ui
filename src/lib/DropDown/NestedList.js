import React from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';
import Check from 'material-ui-icons/Check';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 250,
        margin: 5,
    },
    nested: {
        // paddingLeft: theme.spacing.unit * 4,
        paddingLeft: -50
    },

    button: {
        backgroundColor: "#30b7ff",
        borderRadius: 10,

        '&:hover': {
            backgroundColor: "#2b9cd8"
        },
    },

    check: {
        color: "#2b9cd8",
        fontWeight: "800"
    },
    header:{
        light : "white"
    },
    list:{
        backgroundColor: theme.palette.background.paper,
    }
});

class NestedList extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false,
            selected: 0,
            options: [
             "Acme Application",
             "Lorem Application",
             "Dolor Application",
             "Ipsum Application",
             "Loremipsum Application",
             "Lipsum Application"
            ]
        };

        // this.handleSelectOption = this.handleSelectOption.bind(this, index);
    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    handleSelectOption = (index) => {
        this.setState({ selected: index })
        this.handleClick()
        console.log(index)
    }

    render() {
        const { classes } = this.props;

        return (
            <List className={classes.root}>
                <ListItem button onClick={this.handleClick} disableRipple={true} className={classes.button}>
                    <ListItemText  primary="Acme Application" className={classes.header} style={{fontSize : 20}} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>
                     <ClickAwayListener onClickAway={this.handleClick}>
                    {
                        this.state.options.map((value, index) => {
                            return (
                                <List
                                    key={index}
                                    disablePadding
                                    subheader={index === 0 ? <ListSubheader style={{ fontWeight: "bold", color: "black", alignContent: "center" }}>Choose Application</ListSubheader> : undefined} 
                                    className = {classes.list}
                                    >
                                    <ListItem
                                    button
                                    className={classes.nested}
                                        disableRipple={true}
                                        centerRipple={true}
                                        onClick={(e) => {
                                        this.handleSelectOption(index, e)
                                        }}
                                 //    onClick = {this.handleSelectOption.bind(this,index)}
                                    >
                                        <ListItemText style={{ marginLeft: 0 }} primary={value} />
                                        {this.state.selected === index ? <Check className={classes.check} /> : undefined}
                                    </ListItem>
                                </List>
                            )
                        })
                    }
                </ClickAwayListener>
                </Collapse>
            </List>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(NestedList);