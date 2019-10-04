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
    opacity: '1',
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
  pageIconBtnDisabled: {
    opacity: '.5',
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
     cursor: 'not-allowed',
    }
  },
  pageLargeIconBtn: {
    opacity: '1',
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
  pageLargeIconBtnDisabled: {
    opacity: '.5',
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
     cursor: 'not-allowed',
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
  slideArrow: {
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
    const { id } = this.props;

    return (
      <li
        id={`paginationPage${index+1}-${id || Math.random().toString(36).substr(2, 9)}`}
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
      id
    } = this.props;

    const {
      slideIndex,
      currentSlide
    } = this.state;

    const paginationId = `paginationId-${id || Math.random().toString(36).substr(2, 9)}`;

    let paginationList = [];
    const totalPages = Math.ceil(totalRecords/recordsPerPage);

    for (var i=0; i<totalPages; i++) {
      const index = i;
      const listItem = this.getListItem(index, totalPages, classes, currentPage)
      paginationList.push(listItem);
    }
    if(thresholdPageBtns)
    paginationList =  paginationList.filter((item, index) => (index>=((currentSlide-1)*thresholdPageBtns) && index < (currentSlide*thresholdPageBtns)));

    // set arrow styles for edge cases
    let leftSlideBtnClass = classes.pageLargeIconBtn;
    let leftPageBtnClass = classes.pageIconBtn;

    if (currentSlide === 1) {
      // when user on first slide, fade out left slide arrow
      leftSlideBtnClass = classes.pageLargeIconBtnDisabled;
      if (currentPage === 1) {
        // when use on first page, fade out left page arrow
        leftPageBtnClass = classes.pageIconBtnDisabled;
      }
    }

    let rightSlideBtnClass= classes.pageLargeIconBtn;
    let rightPageBtnClass = classes.pageIconBtn;

    if (currentSlide === slideIndex.length) {
      // when user on last slide, fade out right slide arrow
      rightSlideBtnClass = classes.pageLargeIconBtnDisabled;
      if (currentPage === totalPages) {
        // when user on last page, fade out right page arrow
        rightPageBtnClass = classes.pageIconBtnDisabled;
      }
    }



    return (
      <ul className={classes.pagination} id={`paginationContainer-${paginationId}`}>
        {
          thresholdPageBtns && <li
            id={`prevSlide-${paginationId}`}
            className={leftSlideBtnClass}
            onClick={() => {
              if (currentSlide !== 1) {
                this.onClickPage('prevSlide', totalPages)
              }
            }}
          >
            <LeftIcon classes={{ root: classes.slideArrow }}/>
          </li>
        }
          <li
            id={`prevPage-${paginationId}`}
            className={leftPageBtnClass}
            onClick={() => {
              if (currentPage !== 1) {
                this.onClickPage('prev', totalPages)
              }
            }}
          >
            <LeftIcon classes={{ root: classes.pageArrow }}/>
          </li>
        {paginationList}
        <li
          id={`nextPage-${paginationId}`}
          className={rightPageBtnClass}
          onClick={() => {
            if (currentPage !== totalPages) {
              this.onClickPage('next', totalPages)
            }
          }}
        >
          <RightIcon classes={{ root: classes.pageArrow }} />
        </li>
        {
          thresholdPageBtns && <li
            id={`nextSlide-${paginationId}`}
            className={rightSlideBtnClass}
            onClick={() => {
              if (currentSlide !== slideIndex.length) {
                this.onClickPage('nextSlide', totalPages)
              }
            }}
          >
            <RightIcon classes={{ root: classes.slideArrow }} />
          </li>
        }
      </ul>
    );

    }
}

Pagination.propTypes = {
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
