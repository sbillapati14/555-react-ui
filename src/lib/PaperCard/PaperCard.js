import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Card, { CardContent, CardHeader } from 'material-ui/Card';

const styles = theme => ({
  cardHeader: {
    padding: 0
  },
  title: {
    fontWeight: 'bold',
}
});

function PaperCard(props) {
  const { classes, title, avatar, headerIcon, ...otherProps } = props;

  return (
    <Paper {...otherProps} elevation={2}>
      <Card className={classes.card}>
        <CardHeader
          classes={{ title: classes.title, root: classes.cardHeader }}
          title={title}
          avatar={avatar}
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