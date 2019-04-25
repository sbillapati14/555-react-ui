import React from "react";
import PropTypes from 'prop-types';
import { curry, equals, filter, isEmpty, lensProp, prop, pathOr, reduce, set, __ } from 'ramda';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search'
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  search: {
    position: 'relative',
    width: '100%',
    padding: '0',
    border: 'none',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif'
  },
  optionsWrapper: {
    position: 'absolute',
    zIndex: 99,
    width: '100%',
    boxShadow: '0 0 10px #ccc'
  },
  searchInput: {
    width: '100%',
    padding: '4.8px 20px 4.8px 12px',
    background: '#ffffff',
    border: '1px solid #ccc',
    color: '#666666',
    fontSize: '16px',
    borderRadius: '4px',
    fontWeight: '400',
    height: '40px',
    position: 'relative',
    margin: 0,
    '&:focus-within': {
      border: '1px solid #66afe9',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  psDropdown: {
    maxHeight: '230px',
    ' -webkit-transition': 'max-height .25s ease-out',
    '-o-transition': 'max-height .25s ease-out',
    transition: 'max-height .25s ease-out',
    background: '#fff',
    boxShadow: '1px 2psy'
  },
  active: {
    padding: '10px 0',
    overflow: 'auto',
    border: '1px solid #dcdcdc',
    borderTop: '0px',
    zindex: '100',
    width: '100%',
    boxShadow: '1px 1px 10px #999'
  },
  psLabel: {
    display: 'block',
    fontSize: '16px',
    padding: '10px 16px',
    margin: '0px',
    fontWeight: '400',
    '&:hover': {
      background: '#005b99',
      color: '#fff'
    }
  },
  searchIcon: {
    top: '10px',
    position: 'absolute',
    right: '10px',
    cursor: 'pointer',
    color: '#ccc'
  },
  root: {
    display: 'block'
  }
});

const propChanged = curry((propName, prevProps, nextProps) => !equals(
  prop(propName, prevProps),
  prop(propName, nextProps),
));

class SearchComponent extends React.Component {
  mutableProps = ['value', 'optionsList']

  constructor(props) {
    super(props);
    this.state = {
      value: pathOr('', ['props', 'value'], this),
      optionsList: pathOr([], ['props', 'optionsList'], this),
      listActive: false,
      searchInProgress: false
    };
    this.toggleList = this.toggleList.bind(this);
    this.renderList = this.renderList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onFocusSearch = this.onFocusSearch.bind(this);
    this.onBlurSearch = this.onBlurSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    const changedProps = filter(
      propChanged(__, prevProps, this.props),
      this.mutableProps,
    );
    const composeUpdate = (accum, propName) => set(
      lensProp(propName),
      prop(propName, this.props),
      accum
    );
    const update = reduce(composeUpdate, {}, changedProps);

    if (!isEmpty(update)) {
      this.setState(update);
    }
  }

  toggleList() {
    this.setState({ listActive: !this.state.listActive });
  }

  handleChange(event) {
    const value = pathOr('', ['target', 'value'], event);
    const optionsList = this.props.optionsList.filter(item => item.description.toLowerCase().includes(event.target.value.toLowerCase()))
    this.setState(
      {
        value,
        listActive: true,
        optionsList,
      },
      () => this.props.onChange && this.props.onChange(value),
    );
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (this.state.listActive && this.state.optionsList.length) {
        this.handleFilter(0);
      }
    }
  }


  handleFilter(ind) {
    const match = this.state.optionsList.find((item, i) => i === ind);
    const update = { value: match.description, listActive: false };
    this.setState(
      update,
      () => this.props.onSelect && this.props.onSelect(match),
    );
  }

  onFocusSearch(e) {
    const { value } = this.state;
    this.handleChange({ target: { value: '' } });
    this.setState({
      tempValue: value,
      optionsList: this.props.optionsList,
      listActive: true,
    });
  }

  onBlurSearch(e) {
    const { tempValue, value } = this.state;
    let searchValue = value || tempValue;
    this.props.onBlur && this.props.onBlur(searchValue);
    // (!value&& tempValue) && this.setState({value: tempValue})
    this.setState({ listActive: false })
  }

  renderList() {
    let list, selectOption;
    const { listActive, searchInProgress } = this.state;
    const { classes } = this.props;
    selectOption = this.state.optionsList;
    if (selectOption && listActive && selectOption.length !== 0) {
      list = (
        <div className={classNames(classes.psDropdown, classes.active)}>
          {
            selectOption.map((option, i) => {
              return (
                <label
                  htmlFor={option}
                  className={classes.psLabel}
                  key={i}
                  data-value={i}
                  onMouseDown={this.handleFilter.bind(this, i)} >
                  {option.description}
                </label>
              );
            })
          }
        </div>
      );
    } else if ((!this.state.optionsList || this.state.optionsList.length === 0) && listActive && !searchInProgress) {
      list = <div className={classNames(classes.psDropdown, classes.active)}>
        <label className={classes.psLabel}>No records found</label></div>;
    } else {
      list = <div className={classes.psDropdown} />
    }
    return list;
  }


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <fieldset className={classNames(classes.search, classes.pfSelect)}>
          <input
            type="text"
            name="search"
            autoComplete="off"
            className={classes.searchInput}
            onBlur={this.onBlurSearch}
            onFocus={this.onFocusSearch}
            tabIndex="0"
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <span className={classes.searchIcon}><SearchIcon /></span>
          <Collapse component="div" className={classes.optionsWrapper} in={true} >
            {this.renderList()}
          </Collapse>

        </fieldset>
      </div>
    );
  }
};


// *********** Props documentation **********
SearchComponent.propTypes = {
  placeholder: PropTypes.string,
  optionsList: PropTypes.array,
}

const data = [
  {
    description: "Auth server",
    code: "aith_server"
  },
  {
    description: "Cronos repo",
    code: "cionos_repo"
  },
  {
    description: "Document store",
    code: "document_store"
  },
  {
    description: "Event manager mongo db",
    code: "event_manager_mongodb"
  },
  {
    description: "Cloud code",
    code: "cloud_code"
  },
  {
    description: "Auth  skn server",
    code: "auth_sknserver"
  },
  {
    description: "Itas",
    code: "itas"
  },
  {
    description: "Tnps",
    code: "tnps"
  },
  {
    description: "Auth/identity/iportal mongo db",
    code: "auth/identity/iportal_mongodb"
  },
  {
    description: "Least load",
    code: "least_load"
  },
  {
    description: "Identity manager",
    code: "identity_manager"
  },
  {
    description: "Notification manager",
    code: "notification_manager"
  },
]

SearchComponent.defaultProps = {
  placeholder: "Please search Here",
  optionsList: data
}
export default withStyles(styles)(SearchComponent);
