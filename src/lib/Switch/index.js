import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Toggle from 'react-toggle'
import { withStyles } from 'material-ui/styles';
import "react-toggle/style.css"


class Switch extends React.Component {
    state = {
        checked: false,
    };

       handleToChange(event) {
        this.setState({  checked: event.target.checked });
    }

    render() {
        const { classes } = this.props;
        const { checked } = this.state;

    return (
        <div className={classes.root}>
              <Toggle
                defaultChecked = { checked }
                icons={false}
                onChange={this.handleToChange.bind(this)} />
        </div>



       );
    }
}

export default withStyles()(Switch);




