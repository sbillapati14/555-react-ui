import React, { Component } from 'react';
import { both, complement, filter, is, isNil, mapObjIndexed, toString, values } from 'ramda';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => {
  return {
    root: {
      flexDirection: 'column',
      fontSize: '15px',
      fontFamily: theme.typography.fontFamily,
      fontWeight: 600,
      padding: '0',
      width: '100%',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      height: '1em',
    },
    trunk: {
      paddingTop: '0.6em 0',
      '&:before': {
        content: '""',
        width: '0.1em',
        display: 'block',
        color: '#bdbdbd',
        backgroundColor: '#bdbdbd',
        position: 'absolute',
        top: '0.5em',
        bottom: '0.5em',
        left: '0',
        borderRadius: '0.05em',
      },
    },
    node: {
      padding: '0.5em 0 0.5em 1em',
      '&:before': {
        content: '""',
        width: '0.6em',
        height: '0.1em',
        display: 'block',
        color: '#bdbdbd',
        backgroundColor: '#bdbdbd',
        position: 'absolute',
        top: '1em',
        left: '0',
        borderRadius: '0.05em',
      },
    },
    nodeContent: {
      width: '100%',
    },
  }
};

const isRenderableTreeModel = both(is(Object), complement(is(Array)));

class Tree extends Component {

  state = {
    open: false,
  }

  constructor(props) {
    super(props);
    this.state.open = isNil(props.open) ? false : props.open;
    this.toggleOpen = this.toggleOpen.bind(this);
    this.renderChildModel = this.renderChildModel.bind(this);
    this.wrapChildElement = this.wrapChildElement.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  toggleOpen(e) {
    e.stopPropagation();
    this.setState({ open: !this.state.open });
  }

  renderChildModel(model, key) {
    const { renderNode, classes, path } = this.props;
    const childPath = [...path, key]
    const renderedChild = renderNode(model, childPath);
    const shouldUseChildRendering = !isNil(renderedChild);
    const shouldRenderAsTree = !shouldUseChildRendering && isRenderableTreeModel(model);
    const shouldRenderAsPrimitive = !shouldRenderAsTree && !isNil(model);

    if (shouldUseChildRendering) return (
      <div className={classes.nodeContent}>
        {renderedChild}
      </div>
    ); else if (shouldRenderAsPrimitive) return (
      <div className={classes.nodeContent}>
        {toString(model)}
      </div>
    ); else if (shouldRenderAsTree) return (
      <TreeWithStyles
        label={key}
        path={childPath}
        model={model}
        renderNode={renderNode}
        classes={classes} />
    );
  }

  wrapChildElement(element, key) {
    const { classes } = this.props;

    return element && (
      <ListItem key={key} onClick={e => e.stopPropagation()} className={classes.node}>
        {element}
      </ListItem>
    );
  }

  renderChildren() {
    const { model } = this.props;
    const renderedChildren = mapObjIndexed(this.renderChildModel, model);
    const wrappedChildren = mapObjIndexed(this.wrapChildElement, renderedChildren);
    const children = values(wrappedChildren);

    return filter(complement(isNil), children);
  }

  render() {
    const { label, classes, } = this.props;
    const children = this.state.open && (
      <List className={classes.trunk}>
        {this.renderChildren()}
      </List>
    );

    return (
      <div className={classes.root}>
        <div onClick={this.toggleOpen} className={classes.label}>
          {label}
          {this.state.open ? <ExpandLess viewBox='-6 -6 40 40' /> : <ExpandMore viewBox='-6 -6 40 40' />}
        </div>
        {children}
      </div>
    );
  }
}

Tree.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  model: PropTypes.any.isRequired,
  renderNode: PropTypes.func.isRequired,
  path: PropTypes.arrayOf(PropTypes.string),
  open: PropTypes.bool,
};

Tree.defaultProps = {
  path: [],
  open: false,
};

const TreeWithStyles = withStyles(styles)(Tree)

export default TreeWithStyles;