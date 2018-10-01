import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    root:{
        margin: 'auto',
        width: '100%',
        height: '200px',
        backgroundImage: `radial-gradient( circle 50px at 50px 50px, lightgray 99%, transparent 0 ),
        linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% ),
        linear-gradient( lightgray 20px, transparent 0 ),
        linear-gradient( lightgray 20px, transparent 0 ),
        linear-gradient( lightgray 20px, transparent 0 ),
        linear-gradient( lightgray 20px, transparent 0 )`,
        backgroundRepeat: 'repeat-y',

		backgroundSize:    `100px 200px, 
                            50px 200px, 
                            150px 200px,
                            350px 200px,
                            300px 200px,
                            250px 200px`,

        backgroundPosition:`0 0, 
                            0 0, 
                            120px 0,
                            120px 40px,
                            120px 80px,
                            120px 120px`,
        animation: `shine 1s infinite`,
    }
};
styles['@keyframes shine'] = {
    to: {
        backgroundPosition: `0 0,
                            100% 0, 
                            120px 0,
                            120px 40px,
                            120px 80px,
                            120px 120px`
    }
  }

const Skeleton = (props) => {
        const {classes} = props;
        return(
            <div className={classes.root}>
            </div>
        )
}

export default withStyles(styles)(Skeleton);
