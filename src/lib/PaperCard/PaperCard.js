import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {Card, CardContent, CardHeader } from '@material-ui/core';

const styles = theme => ({
  cardHeader: {
    padding: 0,
  },
  title:{
    fontWeight: 'bold',
    display: 'inline-block'
},
  subheader:{
    display: 'inline-block',
    paddingLeft: '15px'
  }
});

function PaperCard(props) {
  const { classes, title, avatar, headerIcon, subtitle, ...otherProps } = props;

  return (
    <Paper {...otherProps} elevation={2}>
      <Card className={classes.card}>
        <CardHeader
          classes={{ title: classes.title, root: classes.cardHeader, subheader: classes.subheader }}
          title={title}
          avatar={avatar}
          subheader={subtitle}
        />
        <Divider />
        <CardContent>
          {props.children}
        </CardContent>
      </Card>
    </Paper>
  );
}

PaperCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperCard);