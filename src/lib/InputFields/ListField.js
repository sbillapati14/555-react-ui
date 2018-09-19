import React, { Component } from 'react';
import { append, isNil, isEmpty, remove, __ } from 'ramda';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import CloseIcon from '@material-ui/icons/Close';
import UpArrowIcon from '@material-ui/icons/ArrowUpward';
import { setStateOnChange } from '../utils/react';

const styles = theme => ({
  root: {
    display: 'block'
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    background: '#f5f5f5',
    border: 'none',
    outline: 'none',
    borderRadius: 5,
    minHeight: 39,
    height: 'auto',
    fontSize: 14,
    color: '#606060',
    paddingLeft: '1em',
    paddingRight: '3em',
  },
  inputButton: {
    position: 'absolute',
    top: '0.25em',
    right: '0.5em',
  },
  label: {
    color: '#282828',
    display: 'inline-block',
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
  },
  list: {
    padding: '0',
  },
  element: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    '& > *': {
      marginRight: '0.25em',
    },
  },
  elementContent: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  removeElement: {
    stroke: '#1682bc',
    strokeWidth: '0.125em',
    '& path[fill="none"]': {
      strokeWidth: '0',
    },
    '&:hover': {
      cursor: 'pointer'
    },
  },
  error: {
    backgroundColor: '#fce4e4',
    transition: 'background-color 0.3s linear',
  },
  noError: {
    backgroundColor: '#f5f5f5',
    transition: 'background-color 0.8s linear',
  },
});

const removeIndex = remove(__, 1, __);

class ListField extends Component {

  state = {
    value: [],
    pendingElement: '',
    error: false,
  }

  constructor(props) {
    super(props)
    this.state.value = isNil(props.value) ? this.state.value : props.value;
    this.error = this.error.bind(this);
    this.addPendingElement = this.addPendingElement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.renderElements = this.renderElements.bind(this);
  }

  error() {
    this.setState({ error: true });
    setTimeout(() => this.setState({ error: false }), 500);
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  addPendingElement() {
    if (isNil(this.state.pendingElement) || isEmpty(this.state.pendingElement)) {
      this.error();
    } else {
      this.setState(
        {
          value: append(this.state.pendingElement, this.state.value),
          pendingElement: '',
        },
        this.onChange
      );
    }
  }

  removeElement(index) {
    this.setState(
      { value: removeIndex(index, this.state.value) },
      this.onChange
    )
  }

  renderElements() {
    const { classes } = this.props;

    return this.state.value.map(
      (element, index) => (
        <li key={index} className={classes.element}>
          <CloseIcon
            onClick={() => this.removeElement(index)}
            viewBox='-7 -7 35 35'
            color='secondary'
            classes={{
              colorSecondary: classes.removeElement,
            }}
          />
          <span className={classes.elementContent}>{`${element}`}</span>
        </li>
      )
    )
  }

  render() {
    const { classes, inputClasses, onChange, label, style, ...rest } = this.props;
    delete rest.value;
    const inputErrorClass = this.state.error ? classes.error : classes.noError;
    const inputClass = `${classes.input} ${inputErrorClass}`

    return (
      <div className={classes.root}>
        <label className={classes.label}>{label}</label>
        <ul className={classes.list}>
          {this.renderElements()}
        </ul>
        <div className={classes.inputContainer}>
          <Input
            fullWidth={true}
            disableUnderline={true}
            style={style}
            classes={inputClasses}
            className={inputClass}
            value={this.state.pendingElement}
            onChange={setStateOnChange(this, ['pendingElement'])}
            {...rest}
          />
          <UpArrowIcon onClick={this.addPendingElement} className={classes.inputButton} />
        </div>
      </div>
    );
  }
}

ListField.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ])
  ).isRequired,
  onChange: PropTypes.func,
};

export default withStyles(styles)(ListField);