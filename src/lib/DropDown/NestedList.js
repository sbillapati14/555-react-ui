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
import Typography from 'material-ui/Typography';


const styles = theme => ({
    root: {
        Width: 221,
        margin: 10,
        color: "#fff",
        fontSize: 13,
    },

    button: {
        backgroundColor: "#2b9cd8",

        '&:hover': {
            backgroundColor: "#2b9cd8"
        },
    },

    check: {
        color: "#2b9cd8",
        fontWeight: 500,
    },
    list: {
        backgroundColor: theme.palette.background.paper,
    },
    ListItem: {
        fontSize: 13,
        color: "#666666",
        fontWeight: 400,
        position: "relative",
        display: "inline-block",
        width: "100%",

    },
    select: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "500",
    },
    choose: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#282828",
        alignContent: "center",
    }
});

class NestedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selected: props.listOptions.selected,
            options: props.listOptions.options
        };

    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    handleSelectOption = (index) => {
        this.setState({ selected: index, open: false })
    }

    render() {
        const { classes } = this.props;

        const { options, selected } = this.state;

        return (
            <List className={classes.root}>
                <ListItem button onClick={this.handleClick} disableRipple={true} className={classes.button} style={{ borderRadius: this.state.open ? "5px 5px 0px 0px" : "5px 5px 5px 5px" }}>
                    {/*<ListItemText primary={options[selected]} className={classes.header} style={{ fontSize: 15, }} />*/}
                    <Typography className={classes.select} > {options[selected]} </Typography>
                    <ListItemText />
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
                                        subheader={index === 0 ? <ListSubheader className={classes.choose}>Choose Application</ListSubheader> : undefined}
                                        className={classes.list}
                                    >
                                        <ListItem
                                            button
                                            className={classes.nested}
                                            disableRipple={true}
                                            centerRipple={true}
                                            onClick={(e) => {
                                                this.handleSelectOption(index, e)
                                            }}
                                        >
                                            {/* <ListItemText style={{ marginLeft: 0, fontSize:90 }} secondary={value} /> */}

                                            <Typography className={classes.ListItem} style={{ color: this.state.selected === index ? "#2b9cd8" : "#666666" }} > {value} </Typography>
                                            <ListItemText />
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
    listOptions: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(NestedList);