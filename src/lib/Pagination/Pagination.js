import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
  pageBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    width: '45px',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '14px',
    fontWeight: 'normal',
    textAlign: 'center',
    textShadow: 'none',
    padding: '8px 10px',
    borderRadius: '3px',
    border: '1px solid #ccc',
    transition:  'all 0.12s ease-in-out',
    '&:hover': {
     cursor: 'pointer',
     color: 'white',
     backgroundColor: '#2fb3faa8'
    },
  },
  pageIconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    width: '45px',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '14px',
    fontWeight: 'normal',
    textAlign: 'center',
    textShadow: 'none',
    padding: '2px',
    borderRadius: '3px',
    border: '1px solid #ccc',
    transition:  'all 0.12s ease-in-out',
    '&:hover': {
     cursor: 'pointer',
     color: 'white',
     backgroundColor: '#2fb3faa8'
    },
  },
  pageLargeIconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    width: '45px',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '14px',
    fontWeight: 'normal',
    textAlign: 'center',
    textShadow: 'none',
    padding: '0',
    borderRadius: '3px',
    border: '1px solid #ccc',
    transition:  'all 0.12s ease-in-out',
    '&:hover': {
     cursor: 'pointer',
     color: 'white',
     backgroundColor: '#2fb3faa8'
    },
  },
  activeBtn: {
    backgroundColor: '#2fb3fa',
    color: '#fff'
  },
  pagination : {
      margin : '20px 0',
      display: 'flex',
      alignItems: 'center'
  },
  pageArrow: {
    fontSize: '18px',
  },
  pageArrowLarge: {
    fontSize: '30px',
  }
});


class Pagination extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        currentSlide: 1,
        slideIndex: []
      }
  }

  componentDidMount() {
    const { totalRecords, recordsPerPage, thresholdPageBtns} = this.props;
    const totalPages = Math.ceil(totalRecords/recordsPerPage);
    const slideIndex = this.createSlideIndex(totalPages, thresholdPageBtns)
    this.setState({ slideIndex: slideIndex })
  }

  createSlideIndex(totalPages, thresholdPageBtns) {
    let pagesArray = [];
    for (var i=1;i<totalPages+1;i++) {
      pagesArray.push(i)
    }
    return pagesArray.map( function(e,i){
      return i%thresholdPageBtns===0 ? pagesArray.slice(i,(i+thresholdPageBtns)) : null;
    }).filter(function(e){ return e; });
  }

  getSlideByPage(page) {
    const { slideIndex } = this.state;
    let output;
    slideIndex.forEach((slide, i) => {
      if (slide.includes(page)) {
        output = i + 1
      }
    })
    return output
  }

  onClickPage(pageLabel, totalPages) {
    const {currentPage, thresholdPageBtns} = this.props;
    const totalSlides = Math.ceil(totalPages/thresholdPageBtns);
    const {currentSlide} = this.state;
    let nextSlide;
    let pageClicked;

    if (pageLabel==='prev') {
      pageClicked = currentPage>1 ? currentPage-1 : null
    } else if(pageLabel==='next') {
      pageClicked = totalPages>currentPage ? currentPage+1 : null
    } else if (typeof pageLabel === "number") {
      pageClicked = pageLabel+1
    }

    pageClicked && this.props.onClickPage(pageClicked);

    if (pageLabel==='prevSlide') {
      nextSlide = currentSlide>1 ? currentSlide-1 : null
    } else if(pageLabel==='nextSlide') {
      nextSlide = totalSlides>currentSlide ? currentSlide+1 : null
    } else if(this.getSlideByPage(pageClicked) !== currentSlide)
      nextSlide = this.getSlideByPage(pageClicked)

    nextSlide && this.setState({currentSlide: nextSlide})
  }

  getListItem(index, totalPages, classes, currentPage){
    const { title } = this.props;

    return (
      <li
        id={`paginationSlide${index}-${title.split(' ').join('')}`}
        key={index}
        className={classNames({ [classes.activeBtn] : (currentPage===index+1)}, classes.pageBtn )}
        onClick={(e)=>{this.onClickPage(index, totalPages)}}
      >
        {index + 1}
      </li>
    )
  }

  render(){
    const {
      classes,
      totalRecords,
      recordsPerPage,
      currentPage,
      thresholdPageBtns,
      title
    } = this.props;

    let paginationList = [];
    const {currentSlide} = this.state;
    const totalPages = Math.ceil(totalRecords/recordsPerPage);

    for (var i=0; i<totalPages; i++) {
        const index = i;
    const listItem = this.getListItem(index, totalPages, classes, currentPage)
             paginationList.push(listItem);
    }
    if(thresholdPageBtns)
    paginationList =  paginationList.filter((item, index)=>  (index>=((currentSlide-1)*thresholdPageBtns) && index < (currentSlide*thresholdPageBtns)));
    return (
      <ul className={classes.pagination} id={`pagination-${title.split(' ').join('')}`}>
        {
          thresholdPageBtns && <li
            id={`paginationPrevSlide-${title.split(' ').join('')}`}
            className={classes.pageLargeIconBtn}
            onClick={()=>this.onClickPage('prevSlide', totalPages)}
          >
            <LeftIcon classes={{root: classes.pageArrowLarge}}/>
          </li>
        }
        <li
          id={`paginationPrevPage-${title.split(' ').join('')}`}
          className={classes.pageIconBtn}
          onClick={()=>this.onClickPage('prev', totalPages)}
        >
          <LeftIcon classes={{root: classes.pageArrow}}/>
        </li>
        {paginationList}
        <li
          id={`paginationNextPage-${title.split(' ').join('')}`}
          className={classes.pageIconBtn}
          onClick={()=>this.onClickPage('next', totalPages)}
        >
          <RightIcon classes={{root: classes.pageArrow}} />
        </li>
        {
          thresholdPageBtns && <li
            id={`paginationNextSlide-${title.split(' ').join('')}`}
            className={classes.pageLargeIconBtn}
            onClick={()=>this.onClickPage('nextSlide', totalPages)}
          >
            <RightIcon classes={{root: classes.pageArrowLarge}} />
          </li>
        }
      </ul>
    );

    }
}

Pagination.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  totalRecords: PropTypes.number,
  recordsPerPage: PropTypes.number,
  onClickPage: PropTypes.func,
  currentPage: PropTypes.number,
  thresholdPageBtns: PropTypes.number
};

Pagination.defaultProps = {
   totalRecords: 20,
   recordsPerPage: 2,
   onClickPage: ()=>{},
   currentPage: 1,
}

export default withStyles(styles)(Pagination);
