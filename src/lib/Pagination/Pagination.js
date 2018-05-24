import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from "material-ui/styles/withStyles";
import LeftIcon from 'material-ui-icons/ChevronLeft';
import RightIcon from 'material-ui-icons/ChevronRight';

const styles = theme => ({
      pageBtn:{
        display: 'inline-block',
        width: '45px',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '14px',
        fontWeight: 'normal',
        textAlign: 'center',
        textShadow: 'none',
        padding: '8px 10px',
        borderRadius: '3px',
        border: '1px solid #ccc',
        transition:  'all 0.1s ease-in-out',
        '&:hover': {
           cursor: 'pointer'
          },
      },
      activeBtn: {
        backgroundColor: '#2fb3fa',
        color: '#fff'
      },
      pagination : {
          margin : '20px 0'
      },
      pageArrow: {
          fontSize: '12px'
      }
  });


class Pagination extends React.Component { 

onClickPage(pageLabel, totalPages) {debugger;
        const {currentPage} = this.props;
        let pageClicked;
        if(pageLabel==='prev')
            pageClicked = currentPage>1 ? currentPage-1 : null
        else if(pageLabel==='next')
            pageClicked = totalPages>currentPage ? currentPage+1 : null
        else if(typeof pageLabel === "number")
            pageClicked = pageLabel+1
        pageClicked && this.props.onClickPage(pageClicked);
    }

getListItem(index, totalPages, classes, currentPage){
    return (
    <li key={index} 
        className={classNames({ [classes.activeBtn] : (currentPage===index+1)}, classes.pageBtn )}
        onClick={(e)=>{this.onClickPage(index, totalPages)}}>{index + 1}</li>
    )
}    

render(){
    const { classes, totalRecords, recordsPerPage, currentPage, thresholdPageBtns } = this.props;
    let paginationList = [];
    const totalPages = Math.ceil(totalRecords/recordsPerPage);
    for (var i=0; i<totalPages; i++) {
        const index = i;
    const listItem = this.getListItem(index, totalPages, classes, currentPage)
        //  if(index < thresholdPageBtns)
             paginationList.push(listItem);
    }
    return (
         <ul className={classes.pagination}>
            <li className={classes.pageBtn}  onClick={()=>this.onClickPage('prev', totalPages)}>
            <LeftIcon classes={{root: classes.pageArrow}}/></li>
            {paginationList}
            <li className={classes.pageBtn}  onClick={()=>this.onClickPage('next', totalPages)}>
            <RightIcon classes={{root: classes.pageArrow}} /></li>
        </ul>
    );

    }
}

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  totalRecords: PropTypes.number,
  recordsPerPage: PropTypes.number
};

Pagination.defaultProps = {
   totalRecords: 20,
   recordsPerPage: 2,
   onClickPage: ()=>{}
}

export default withStyles(styles)(Pagination);



