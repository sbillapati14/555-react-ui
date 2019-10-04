import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="title">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class AlertHelpDialog extends React.Component {
  state = {
    open: false,
  };

  // handleClickOpen = () => {
  //   console.log('Opening helpdialog');
  //   this.setState({
  //     open: true,
  //   });
  // };

  // handleClose = () => {
  //   console.log('Closing help dialog');
  //   this.setState({ open: false });
  // };

  render() {
    const {
      dialogTitle,
      dialogContent,
      handleClose,
      // open,
    } = this.props;

    return (
        <Dialog
          // onClose={this.handleClose}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {dialogTitle}
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              {dialogContent}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default AlertHelpDialog;

AlertHelpDialog.propTypes = {
  dialogTitle: PropTypes.string,
  dialogContent: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

AlertHelpDialog.defaultProps = {
  dialogTitle: '',
  dialogContent: '',
  open: false,
  handleClose: () => {},
};
