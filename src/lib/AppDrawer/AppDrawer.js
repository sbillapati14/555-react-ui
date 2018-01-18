import React, { Component } from "react";
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';

const styles = theme => {
    return {
        paper: {
            width: 266,
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            color: theme.palette.text.secondary,
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
        // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
        toolbarIe11: {
            display: 'flex',
        },
        toolbar: {
            width: '100%',
        },
    }
};

class AppDrawer extends Component {
    render() {
        const { children, className, classes, title, mobileOpen, onClose } = this.props;

        const drawer = (
            <div className={classes.nav}>
                <div className={classes.toolbarIe11}>
                    <Toolbar className={classes.toolbar}>
                        {title !== null && (
                            <Typography type="title" gutterBottom color="inherit">
                                {title}
                            </Typography>
                        )}
                        <Divider absolute />
                    </Toolbar>
                </div>
            </div>
        )

        if (mobileOpen) {
           
        }

        return (
            <aside className={className}>
                {drawer}
                {children}
                <h2>hello</h2>
            </aside>
        )
    }
}

export default withStyles(styles)(AppDrawer);