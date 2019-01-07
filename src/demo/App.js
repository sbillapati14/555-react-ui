import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  NavLink,
} from 'react-router-dom'
import { last, filter, startsWith, map } from 'ramda';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import InboxIcon from '@material-ui/icons/Inbox';
import Language from '@material-ui/icons/Language';

import AppWrapper from '../lib/AppWrapper';
import AppContainer from '../lib/AppContainer';
import AppFrame from '../lib/AppFrame';
import AppPage, { PageLeft, PageRight } from '../lib/AppPage';
import AppBar from '../lib/AppBar';
import AnalyticsBox from '../lib/AnalyticsBox';
import Issues from '../lib/Issues/Issues';
import PopOver from '../lib/PopOver';
import Pagination from '../lib/Pagination';
import AppDrawer from '../lib/AppDrawer';
import AppContent from '../lib/AppContent';
import AlertsAndNotifications from '../lib/AlertsAndNotifications';
import HealthChart from '../lib/HealthChart';
import ColorIndicators from '../lib/ColorIndicators';
import Skeleton from '../lib/Skeleton';
import SearchDropdown from '../lib/SearchDropdown';
import ProgressIndicator from '../lib/ProgressIndicator';

import OutlineButton from '../lib/Button/OutlineButton';
import GradientButton from '../lib/Button/GradientButton';
import AccentButton from '../lib/Button/AccentButton';
import PaperCard from '../lib/PaperCard';
import { BarChart } from '../lib/Graphs';
import { TextField, FormField, ListField } from '../lib/InputFields';
import { Switch, SwitchButton } from '../lib/Switch';
import FilterStatus from '../lib/DropDown/FilterStatus';
import { SelectList, SelectListItem } from '../lib/SelectList';
import SideNav, { SideNavSection, SideNavOption } from '../lib/SideNav';
import Tree from '../lib/Tree';
import Icon from '../icons';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ContextMenu from '../lib/ContextMenu';
import { D3LineChart } from '../lib/D3LineChart';
import { NivoLineChart } from '../lib/NivoLineChart';
import { NivoStackedBarChart } from '../lib/NivoStackedBarChart';
import { MyApps } from '../lib/MyApps';
import { AppElement } from '../lib/AppElement';






const styles = theme => ({
  appBar: {
    display: 'flex'
  },
  cardHeader: {
    padding: '0 15px'
  },
  healthIndicesWrapper: {
    textAlign: 'right',
    margin: '10px 5px'
  },
  indicator: {
    padding: '0 5px'
  },
  colorBox: {
    width: '10px',
    height: '10px',
    background: '#000',
    position: 'absolute',
    marginTop: '3px'
  },
  healthLabel: {
    padding: '0 0 0 15px',
  },
  fileInTree: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    '& > *': {
      margin: '0 0.25em',
    }
  },
})

class App extends Component {

  state = {
    selectedApplication: '',
    selectedTeam: '',
    notification: false,
    cpyToClip: 'Click on the right icon to copy input value',
    pageNumber1: 1,
    pageNumber2: 1,
    listInput: ['app1.domain.com', 'app2.domain.com', 'app3.domain.com'],
    searchDropdownValue: '',
    searchDropdownOptions: ['one', 'two', 'three', 'four', 'five'],
    searchDropdownMatches: [],
    applications: [],
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ notification: !this.state.notification });
  }

  handleClose = () => {
    this.setState({ notification: false });
  };
  copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = this.state.cpyToClip;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handlPageChange = (pageNumber, key) => {
    this.setState({ [key]: pageNumber })
  }



  render() {

    const { selectedApplication, selectedTeam } = this.state;
    const { classes } = this.props;
    const { cardHeader } = classes;

    return (
      <AppContainer>

        <AppWrapper render={({ isMobileOpen, toggleDrawer }) =>

          <AppFrame>

            <AppDrawer title="IRIS| Portal" isMobileOpen={isMobileOpen}>

              <Router>
                <nav>

                  <SelectList primary={true} name="selectedTeam" value={selectedTeam} onChange={this.handleChange('selectedTeam')}>
                    <SelectListItem value="team_1">Team 1</SelectListItem>
                    <SelectListItem value="team_2">Team 2</SelectListItem>
                    <SelectListItem value="team_3">Team 3</SelectListItem>
                  </SelectList>

                  <SideNav>

                    {/* this is out menu with nested also */}
                    <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<InboxIcon height="20" />} label="Section NavLink" />
                    <SideNavSection leftIcon={<span><Icon icon="credit" /></span>} label="Auth Types" >
                      <SideNavOption component={NavLink} to="/page-one" primary="Server API Endpoints" />
                      <SideNavOption component={NavLink} to="/page-two" primary="Report a Problem" />
                      <SideNavOption component={NavLink} to="/page-three" primary="API Status" />
                      <SideNavOption component={NavLink} to="/page-four" primary="Call Trace" />
                      <SideNavOption primary="Not A Link" />
                    </SideNavSection>
                    <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="token" /></span>} label="Tokens" />
                    <SideNavSection leftIcon={<InboxIcon height="20" />} label="More Options" >
                      <SideNavOption component={NavLink} to="/page-one" primary="Server API Endpoints" />
                      <SideNavOption component={NavLink} to="/page-two" primary="Report a Problem" />
                      <SideNavOption component={NavLink} to="/page-three" primary="API Status" />
                      <SideNavOption component={NavLink} to="/page-four" primary="Call Trace" />
                      <SideNavOption primary="Not A Link" />
                    </SideNavSection>
                    <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="notify" /></span>} label="Notification" />
                    <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="tools" /></span>} label="Tools And Support" />
                    <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="heart" /></span>} label="Platform Health" />
                    <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="settings" /></span>} label="Settings" />
                    <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="about" /></span>} label="About" />
                  </SideNav>
                </nav>
              </Router>

            </AppDrawer>

            <AppContent isMobileOpen={isMobileOpen}>

              <AppBar icon={<Language />} classes={{ toolbar: classes.appBar }} title="" toggleDrawer={toggleDrawer}
                righticon={<span onClick={this.handleClick.bind(this)}><Icon icon="bell-alert" /></span>}
                notification={this.state.notification ? (<ClickAwayListener onClickAway={this.handleClose}><PaperCard
                  title="Alerts and Notifications"
                  avatar={
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  }
                >
                  <AlertsAndNotifications />
                </PaperCard></ClickAwayListener>) : ''}>


                <SelectList name="selectedApplication" value={selectedApplication} onChange={this.handleChange('selectedApplication')} fullWidth>
                  <SelectListItem value="yolo_app">Yolo App</SelectListItem>
                  <SelectListItem value="1_app">Test App</SelectListItem>
                  <SelectListItem value="3">Funny App</SelectListItem>
                </SelectList>

                {/*
                <PopOver Component={<Icon icon="bell-alert" height="40" width="40" />}>
                  <PaperCard
                    title="Notifications"
                    avatar={
                      <Icon icon="bell-notif" height="36" width="33" />
                    }
                  >
                    <AlertsAndNotifications/>
                  </PaperCard>
                </PopOver>
                {<Icon icon="about" height="40" width="40" />}
                {<Icon icon="settings" height="40" width="40" />}
                  */}

                {/* <Menu
                  button={<Button> Open Menu </Button>}
                  render={({ handleClose }) => (
                    <MenuList>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <SendIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Sent mail" />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Drafts" />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <MoveToInboxIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Inbox" />
                      </MenuItem>
                    </MenuList>
                  )}
                /> */}

              </AppBar>


              <AppPage>

                <PageLeft>

                <PaperCard
                  title="Application Name"
                  avatar={<Icon icon= "language" height="36" width="33" />}
                >
                  <AppElement />
                </PaperCard>
                <br />

                </PageLeft>
              </AppPage>

            </AppContent>

          </ AppFrame>

        } />
      </AppContainer>
    )
  }
}

export default withStyles(styles)(App);