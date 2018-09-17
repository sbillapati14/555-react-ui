import React, { Component } from 'react';
import { isNil } from 'ramda';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: 0
  }
})

class Node extends Component {

  state = {
    selected: false,
  }

  constructor(props) {
    super(props);
    this.state.selected = isNil(props.selected) ? false : props.selected;
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected(e) {
    e.stopPropagation();
    this.setState({ selected: !this.state.selected });
  }

  render() {
    const { label, value, classes } = this.props;

    return (
      <ListItem key={label} onClick={this.toggleSelected}>
        <span className="medium">{label}</span> {value}
      </ListItem>
    );
  }
}

Node.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.element.isRequired,
};

export default withStyles(styles)(Node);