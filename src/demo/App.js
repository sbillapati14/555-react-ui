import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
  BrowserRouter as Router,
  NavLink,
} from 'react-router-dom'

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import InboxIcon from 'material-ui-icons/Inbox';
import Language from 'material-ui-icons/Language';

import AppWrapper from '../lib/AppWrapper';
import AppContainer from '../lib/AppContainer';
import AppFrame from '../lib/AppFrame';
import AppPage, { PageLeft, PageRight } from '../lib/AppPage';
import AppBar from '../lib/AppBar';
import Issues from '../lib/Issues/Issues';
import PopOver from '../lib/PopOver';
import AppDrawer from '../lib/AppDrawer';
import AppContent from '../lib/AppContent';
import AlertsAndNotifications from '../lib/AlertsAndNotifications';

import OutlineButton from '../lib/Button/OutlineButton';
import GradientButton from '../lib/Button/GradientButton';
import AccentButton from '../lib/Button/AccentButton';
import PaperCard from '../lib/PaperCard';
import { TextField, FormField } from '../lib/InputFields';
import Switch from '../lib/Switch/Switch';
import FilterStatus from '../lib/DropDown/FilterStatus';
import { SelectList, SelectListItem } from '../lib/SelectList';
import SideNav, { SideNavSection, SideNavOption } from '../lib/SideNav';
import Icon from '../icons';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';

const styles = theme => ({ 
  appBar: {
    display: 'flex'
  }
})

class App extends Component {

  state = {
    selectedApplication: '',
    selectedTeam: '',
    notification: false,
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // function ActionLink()
  handleClick(e) {
     e.preventDefault();
     this.setState({ notification: !this.state.notification});
  }

  handleClose = () => {
    this.setState({ notification: false});
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {

    const { selectedApplication, selectedTeam } = this.state;
    const { classes } = this.props;

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
                    <SideNavSection leftIcon={<span><Icon icon="credit"/></span>} label="Auth Types" >
                      <SideNavOption component={NavLink} to="/page-one" primary="Server API Endpoints" />
                      <SideNavOption component={NavLink} to="/page-two" primary="Report a Problem" />
                      <SideNavOption component={NavLink} to="/page-three" primary="API Status" />
                      <SideNavOption component={NavLink} to="/page-four" primary="Call Trace" />
                      <SideNavOption primary="Not A Link" />
                    </SideNavSection>
                   <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="token"/></span>} label="Tokens" />
                   <SideNavSection leftIcon={<InboxIcon height="20" />} label="More Options" >
                      <SideNavOption component={NavLink} to="/page-one" primary="Server API Endpoints" />
                      <SideNavOption component={NavLink} to="/page-two" primary="Report a Problem" />
                      <SideNavOption component={NavLink} to="/page-three" primary="API Status" />
                      <SideNavOption component={NavLink} to="/page-four" primary="Call Trace" />
                      <SideNavOption primary="Not A Link" />
                    </SideNavSection>
                      <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="notify"/></span>} label="Notification" />
                      <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="tools"/></span>} label="Tools And Support" />
                      <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="heart"/></span>} label="Platform Health" />
                      <SideNavSection component={NavLink} to="/stand-alone-nav-section"  leftIcon={<span><Icon icon="settings"/></span>} label="Settings" />
                      <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<span><Icon icon="about"/></span>} label="About" />
                  </SideNav>
                </nav>
              </Router>

            </AppDrawer>

            <AppContent isMobileOpen={isMobileOpen}>

               <AppBar icon={<Language />} classes={{toolbar:classes.appBar}} title="Acme Application" toggleDrawer={toggleDrawer} 
               righticon={<span onClick={this.handleClick.bind(this)}><Icon icon="bell-alert"/></span>}
               notification= {this.state.notification?(<ClickAwayListener onClickAway={this.handleClose}><PaperCard
                  title="Alerts and Notifications"
                  avatar={
                     <Avatar>
                     <ImageIcon />
                     </Avatar>
                  }
               >
               <AlertsAndNotifications/>
                  </PaperCard></ClickAwayListener>): ''}>


                <SelectList name="selectedApplication" value={selectedApplication} onChange={this.handleChange('selectedApplication')} fullWidth>
                  <SelectListItem value="yolo_app">Yolo App</SelectListItem>
                  <SelectListItem value="1_app">Test App</SelectListItem>
                  <SelectListItem value="3">Funny App</SelectListItem>
                </SelectList>

                <PopOver Component = {<Icon icon="bell-alert" height="50" width="50"/>}>
                   <AlertsAndNotifications/>
                </PopOver>

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
                    title="Alerts and Notifications"
                    avatar={
                        <Avatar>
                        <ImageIcon />
                        </Avatar>
                }
                >
                <AlertsAndNotifications/>
                    </PaperCard>

                    <br />
                    <PaperCard
                    title="Buttons"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <Button>Root</Button>
                    <GradientButton>Gradien tButton</GradientButton>
                    <OutlineButton color="white">OutlineButton</OutlineButton>
                    <AccentButton>AccentButton</AccentButton>
                  </PaperCard>

                  <br />

                  <PaperCard
                    title="Paper Card"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <Typography>
                      Here is the content of the PaperCard
                    </Typography>

                  </PaperCard>

                  <br />
                  <PaperCard
                    title="Form Inputs"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <form>
                      <FormField label="App Domain" value='Example' onChange={(e) => console.log(e)} />
                      <FormField id="Disable" label="Federation Type" value="Disable input" disabled={true} />
                      <FormField id="secret" label="App Secret" value="abc" />
                      <FormField id="key" label="App Key" value="sdfasfsadf" />
                      <FormField id="app" label="App" value="aa" />
                    </form>
                  </PaperCard>
                  <br />

                </PageLeft>

                <PageRight>

                  <Issues />
                  <PaperCard
                    title="Switch's"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <Typography variant="display3" gutterBottom>Switch</Typography>
                    <Switch checked={true} ></Switch>
                    <Switch checked={false} ></Switch>
                    <Switch disabled={true} ></Switch>
                  </PaperCard>

                  <br />
                    <PaperCard
                    title="Filters"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <FilterStatus>
                      <form>
                        <TextField
                          id="Example"
                          label="Example"
                          margin="normal"
                          placeholder="Example"
                        />
                        <TextField disabled
                          id="Disabled"
                          label="Disabled"
                          margin="normal"
                          placeholder="Disabled"
                          value="Disable input"
                        />
                        <TextField
                          hintText="Text Here"
                          fullWidth={true}
                          floatingLabelText="Text Here Label"
                        />
                      </form>
                    </FilterStatus>
                  </PaperCard>

                </PageRight>
              </AppPage>

            </AppContent>

          </ AppFrame>

        } />
      </AppContainer>
    )
  }
}

export default withStyles(styles)(App);