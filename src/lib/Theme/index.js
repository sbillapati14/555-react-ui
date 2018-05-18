import createMuiTheme from 'material-ui/styles/createMuiTheme';
import 'typeface-montserrat';

import Palette from './palette';
import Typography from './typography';

const theme = createMuiTheme({
  palette: Palette.themePalette,
  typography: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
  },
  overrides: {
    MuiFormLabel: {
      focused: {
        display: 'none',
        '&:before': {
          height: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }
      },

    },
    MuiAppBar: {
      root: {
        backgroundColor: '#FFF'
      },
    },
    MuiToolbar: {
      root: {
        backgroundColor: '#2e4957',
        color: '#FFF'
      }
    },
    MuiInput: {
      root: {
      },
//      inkbar: {
//        '&:after': {
//          display: 'none',
//          backgroundColor: 'rgba(0, 0, 0, 0.42)'
//        }
//      },
      underline: {
        '&:hover:before': {
          height: '1px !important',
          backgroundColor: 'rgba(0, 0, 0, 0.42) !important'
        }
      },
      disabled: {
        backgroundColor: Palette.primaryLight,
        paddingLeft: '1em',
        color: Palette.inputTextColor,
        '&:before': {
          backgroundImage: 'none !important'
        },
        '&:hover:before': {
          height: '0',
          backgroundColor: 'rgba(0, 0, 0, 0) !important'
        }
      }
    },
    MuiPaper: {
      root: {},
      elevation2: {
        boxShadow: '0px 1px 28px -6px rgba(0,0,0,0.3)',
        borderRadius: '5px'
      }
    },
    MuiCardHeader: {
      root: {
        padding: 0
      },
      title: {
        color: Palette.primaryDark,
        fontWeight: Typography.fontWeightMedium,
        lineHeight: '64px',
        position: 'relative',
        fontSize: '19px',
      },
      avatar: {
        padding: '0 1em',
        marginRight: 0,
      }
    },
    MuiCardContent: {
      root: {
        padding: '1em'
      }
    },
    MuiButton: {
      root: {
        background: Palette.primary,
        borderRadius: 47,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 1rem',
        fontWeight: Typography.fontWeightMedium,
        textTransform: 'none',
        margin: '0 33px 0 0',
        fontSize: '18px',
      },
    },
  },
});

export default theme;

