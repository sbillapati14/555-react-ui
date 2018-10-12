import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
   root: {
       margin: 'auto'
    },
   mask:{
       animation: 'mask 975ms ease infinite',
    },
    '@keyframes mask': {
        'from' :{transform: 'translateX(0)'},
        'to' :{transform: 'translateX(280px)'}
    }
}
class SkeletonLoader extends React.Component{
    render(){
      const {classes} = this.props;
       return(
        <svg className={classes.root} width="100%" height="100%" viewBox={this.props.viewBox} xmlns="http://www.w3.org/2000/svg"  style={{fillRule:"evenodd", clipRule:"evenodd", strokeLinejoin:"round", strokeMiterlimit:1.41421}}>
           <mask id="mask-element">
             <path fill="#777" d="M283,18.75c0,-0.69 -0.56,-1.25 -1.25,-1.25l-183.5,0c-0.69,0 -1.25,0.56 -1.25,1.25l0,2.5c0,0.69 0.56,1.25 1.25,1.25l183.5,0c0.69,0 1.25,-0.56 1.25,-1.25l0,-2.5Z"/>
             <path fill="#777" d="M283,28.75c0,-0.69 -0.56,-1.25 -1.25,-1.25l-183.5,0c-0.69,0 -1.25,0.56 -1.25,1.25l0,2.5c0,0.69 0.56,1.25 1.25,1.25l183.5,0c0.69,0 1.25,-0.56 1.25,-1.25l0,-2.5Z"/>
             <path fill="#777" d="M254,38.75c0,-0.69 -0.56,-1.25 -1.25,-1.25l-154.5,0c-0.69,0 -1.25,0.56 -1.25,1.25l0,2.5c0,0.69 0.56,1.25 1.25,1.25l154.5,0c0.69,0 1.25,-0.56 1.25,-1.25l0,-2.5Z"/>
             <path fill="#777" d="M281.75,48.75c0,-0.69 -0.56,-1.25 -1.25,-1.25l-182.25,0c-0.69,0 -1.25,0.56 -1.25,1.25l0,2.5c0,0.69 0.56,1.25 1.25,1.25l182.25,0c0.69,0 1.25,-0.56 1.25,-1.25l0,-2.5Z"/>
             <path fill="hsla(200,0%,10%,.6)" className={classes.mask} d="M52,17.5l0,35l-40,0l20,-35l20,0Z"/>
           </mask>
            <path mask="url(#mask-element)" d="M283,18.75c0,-0.69 -0.56,-1.25 -1.25,-1.25l-183.5,0c-0.69,0 -1.25,0.56 -1.25,1.25l0,2.5c0,0.69 0.56,1.25 1.25,1.25l183.5,0c0.69,0 1.25,-0.56 1.25,-1.25l0,-2.5Z" fill="#dadada"/>
            <path mask="url(#mask-element)" d="M283,28.75c0,-0.69 -0.56,-1.25 -1.25,-1.25l-183.5,0c-0.69,0 -1.25,0.56 -1.25,1.25l0,2.5c0,0.69 0.56,1.25 1.25,1.25l183.5,0c0.69,0 1.25,-0.56 1.25,-1.25l0,-2.5Z" fill="#dadada"/>
            <path mask="url(#mask-element)" d="M254,38.75c0,-0.69 -0.56,-1.25 -1.25,-1.25l-154.5,0c-0.69,0 -1.25,0.56 -1.25,1.25l0,2.5c0,0.69 0.56,1.25 1.25,1.25l154.5,0c0.69,0 1.25,-0.56 1.25,-1.25l0,-2.5Z" fill="#dadada"/>
            <path mask="url(#mask-element)" d="M281.75,48.75c0,-0.69 -0.56,-1.25 -1.25,-1.25l-182.25,0c-0.69,0 -1.25,0.56 -1.25,1.25l0,2.5c0,0.69 0.56,1.25 1.25,1.25l182.25,0c0.69,0 1.25,-0.56 1.25,-1.25l0,-2.5Z" fill="#dadada"/>
          </svg>
        )
    }
}

export default withStyles(styles)(SkeletonLoader);

SkeletonLoader.defaultProps = {
    viewBox: '80 10 220 50'
}
