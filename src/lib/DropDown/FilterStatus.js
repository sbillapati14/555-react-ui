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
import Dot from 'material-ui-icons/Brightness1'
import Divider from 'material-ui/Divider';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Paper from 'material-ui/Paper/Paper';
import Card from 'material-ui/Card/Card';

const styles = theme => ({
    root: {
        maxWidth: 230,
        margin: 20,
    },

    nested: {
        // paddingLeft: theme.spacing.unit * 4,
        // paddingLeft: -50,
    },

    button: {
        backgroundColor: "#F0F0F0",
        borderRadius: 30,
        width: 130,
        marginBottom: 5,

        '&:hover': {
            backgroundColor: "#F0F0F0"
        },
    },

    check: {
        color: "#2b9cd8",
        fontWeight: "800"
    },
    header: {
        // light: "white"
    },

    divider: {
        backgroundColor: "#F0F0F0"
    },
});

class NestedList extends React.Component {
    constructor() {
      super();
      this.state = {
        open: true,
        selected: 0,
        options: [
            {
                value: "All",
                color: "#585858",

            },
            {
                value: "Closed",
                color: "#1eb368"
            },
            {
                value: "Open",
                color: "#ee4c4c"
            },
            {
                value: "Review",
                color: "#2b9cd8"
            },
        ]
    };
    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    handleSelectOption = (index) => {

        console.log("clicked", index)
        this.setState({ selected: index })
        // this.handleClick
        if (index === 0) {
            this.setState({ open: false });

        }

        setTimeout((_) => {
            this.handleClick
        }, 300)
        console.log(index)
    }

    render() {
        const { classes } = this.props;
        const { options, selected } = this.state;

        return (

            <List className={classes.root}>
                <ListItem button onClick={this.handleClick} disableRipple={true} className={classes.button}>
                    <ListItemText primary={this.state.options[selected].value} className={classes.header} style={{ fontSize: 20 }} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>
                   <ClickAwayListener onClickAway={this.handleClick}>
                    {
                    this.state.options.map((element, index) => {
                        return (
                        <div style={{ backgroundColor: "white" }}>
                            <List
                                key={index}
                                disablePadding
                                subheader={index === 0 ? <ListSubheader style={{ fontWeight: "bold", color: "#666666", alignContent: "center", }}>Filter-By-Status :</ListSubheader> : undefined} >
                                <ListItem
                                button
                                className={classes.nested}
                                disableRipple={true}
                                centerRipple={true}
                                // onClick={(e) => {
                                //     this.handleSelectOption(index, e)
                                // }}
                                >
                                <Dot style={{ color: element.color, }} />
                                <ListItemText style={{ marginLeft: 0, }} primary={element.value} onClick={(e) => {
                            this.handleSelectOption(index, e)
                        }} />
                                {this.state.selected === index ? <Check className={classes.check} /> : undefined}
                                </ListItem>
                                <Divider className={classes.divider} />
                            </List>
                        </div>
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