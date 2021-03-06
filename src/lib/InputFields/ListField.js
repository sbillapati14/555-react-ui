import React, { Component } from 'react';
import { append, isNil, isEmpty, remove, __ } from 'ramda';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
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
    '&:hover': {
      cursor: 'pointer',
    },
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
    justifyContent: 'space-between',
  },
  elementContent: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  removeElement: {
    marginRight: '0.5em',
    stroke: 'black',
    fill: 'black',
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

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
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
          <span className={classes.elementContent}>{`${element}`}</span>
          <RemoveIcon
            onClick={() => this.removeElement(index)}
            viewBox='-7 -7 35 35'
            color='secondary'
            classes={{
              colorSecondary: classes.removeElement,
            }}
          />
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
          <AddIcon onClick={this.addPendingElement} className={classes.inputButton} />
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