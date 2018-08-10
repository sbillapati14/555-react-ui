import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  search : {
    position: 'relative',
    width: '100%',
    padding: '40px',
    border: 'none',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif'
    },
  searchInput: {
    width: '100%',
    padding: '4.8px 20px 4.8px 12px',
    background: '#ffffff',
    border: '1px solid #666',
    color: '#666666',
    fontSize: '16px',
    borderRadius: '4px',
    fontWeight: '400',
    height: '40px',
    margin: 0,
    '&:focus-within': {
      border: '1px solid #66afe9',
      boxShadow:'0 0 0 0.2rem rgba(0,123,255,.25)'
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
  active:{
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
  '&:hover':{
        background: '#005b99',
        color: '#fff'
    }
  },
  searchIcon:{
    top: '50px',
    position: 'absolute',
    right: '46px',
    cursor: 'pointer'
  },
})

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      options: this.props.optionsList || [],
      listActive:  false,
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

  toggleList() {
    this.setState({ listActive: !this.state.listActive });
  }

  handleChange(event) {
    var options = this.props.optionsList.filter(item=> item.description.toLowerCase().includes(event.target.value.toLowerCase()))
    this.setState({ value: event.target.value, listActive: true, options });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (this.state.listActive && this.state.options.length) {
        this.handleFilter(0);
      }
    }
  }


  handleFilter(ind) {
    let stateToUpdate = {}
      stateToUpdate.value = this.state.options.find((item, i)=> i===ind).description;
      stateToUpdate.listActive = false;
    this.setState(stateToUpdate, ()=>{
        this.props.onSelect && this.props.onSelect(this.props.optionsList[ind])
    });
  }

  onFocusSearch(e){
    const {value} = this.state;
    this.handleChange({target:{value:''}});
    this.setState({tempValue: value, options: this.props.optionsList, listActive: true})
  }

  onBlurSearch(e){
    const {tempValue, value} = this.state;
      let searchValue = value || tempValue ;
      this.props.onBlur && this.props.onBlur(searchValue);
      (!value&& tempValue) && this.setState({value: tempValue})
        this.setState({listActive: false})
  }

  renderList() {
    let list, selectOption;
    const { listActive, searchInProgress } = this.state;
    const {classes} = this.props;
    selectOption = this.state.options;
    if (selectOption && listActive && selectOption.length !== 0) {
      list = (
        <div className={classNames(classes.psDropdown, classes.active)}>
          {
            selectOption.map((option, i) => {
              return (
                <label
                  htmlFor={option}
                  className = {classes.psLabel}
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
    } else if ((!this.state.options || this.state.options.length === 0) && listActive && !searchInProgress) {
      list = <div className = {classNames(classes.psDropdown, classes.active)}>
      <label className = {classes.psLabel}>No records found</label></div>;
    } else {
      list = <div className = {classes.psDropdown} />
    }
    return list;
  }


  render() {
    const {classes} = this.props;
    return (
      <div className="clear" className={classes.clear}>
        <fieldset className={classNames(classes.search, classes.pfSelect)}>
          <input type="text" name="search" className={classes.searchInput}
            onBlur={this.onBlurSearch}
            onFocus={this.onFocusSearch}
            tabIndex="0"
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <span className={classes.searchIcon}><SearchIcon/></span>
          {this.renderList()}
        </fieldset>
      </div>
    );
  }
};


// *********** Props documentation **********
SearchComponent.propTypes = {
  placeholder: PropTypes.string,
  optionsList: PropTypes.array
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
export default withStyles(styles) (SearchComponent);