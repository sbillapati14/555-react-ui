import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  NavLink,
} from 'react-router-dom'
import { last } from 'ramda';

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
    pageNumber2: 1
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

              <AppBar icon={<Language />} classes={{ toolbar: classes.appBar }} title="Acme Application" toggleDrawer={toggleDrawer}
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

                <PopOver Component={<Icon icon="bell-alert" height="40" width="40" />}>
                  <PaperCard
                    title="Notifications"
                    avatar={
                      <Icon icon="bell-notif" height="36" width="33" />
                    }
                  >
                    <AlertsAndNotifications />
                  </PaperCard>
                </PopOver>
                {<Icon icon="about" height="40" width="40" />}
                {<Icon icon="settings" height="40" width="40" />}

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
                    avatar={<Icon icon="bell-notif" height="36" width="33" />}
                  >
                    <AlertsAndNotifications />
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
                      <FormField id="cpyToClip" label="Copy to CLipboard" value={this.state.cpyToClip} endAdornment={<span onClick={this.copyToClipboard.bind(this)}><Icon icon="copyToClipboard" viewBox="0 0 500 500" fill="#282828" /></span>} />
                      <FormField type="file" id="upload" label="File Upload" />
                      <ListField label="List Input" value={['string value', true, 110100001101001]} onChange={console.log} />
                    </form>
                  </PaperCard>
                  <br />

                  <PaperCard
                    title="Search Dropdown"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <SearchDropdown
                      validationState={() => { }}
                      selectedFilterObj={{ filterBy: 'code', placeholder: 'search a service', textStyle: 'uppercase' }}
                      autoSuggestResults={this.props.autoSuggestWritingBrokers}
                      onFilter={this.props.handleFilter}
                    />
                  </PaperCard>
                  <br />

                  <PaperCard
                    title="Pagination"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <Pagination
                      totalRecords={200}
                      recordsPerPage={20}
                      thresholdPageBtns={5}
                      currentPage={this.state.pageNumber1}
                      onClickPage={(page) => this.handlPageChange(page, "pageNumber1")}
                    />
                    <Pagination
                      totalRecords={20}
                      recordsPerPage={4}
                      currentPage={this.state.pageNumber2}
                      onClickPage={(page) => this.handlPageChange(page, "pageNumber2")}
                    />
                  </PaperCard>
                  <br />

                  <PaperCard title="Miscellaneous"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <AnalyticsBox />
                    <br />
                  </PaperCard>

                  <br />
                  <PaperCard title="Color Indicators"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <ColorIndicators />
                  </PaperCard>

                  <br />
                  <PaperCard title="Progress Indicator"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <ProgressIndicator />
                  </PaperCard>


                  <br />

                  <PaperCard
                    title="Charts"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <BarChart
                      chartId="samplBarChart"
                      chartWidth={500}
                      chartHeight={300}
                      barWidth={50} />

                    <br />

                  </PaperCard>
                  <br />
                  <PaperCard title={"Simple Health Chart"} subtitle={'subtitle'} classes={{ cardHeader }}
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <div className={classes.healthIndicesWrapper}>
                      <ColorIndicators />
                    </div>
                    <HealthChart />
                  </PaperCard>


                </PageLeft>

                <PageRight>
                  <PaperCard title="Issues"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <Issues />
                  </PaperCard>

                  <br />
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
                    <SwitchButton checked={true}></SwitchButton>
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

                  <br />
                  <PaperCard
                    title="Tree"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                    <Tree
                      label='Folder Example'
                      model={{
                        'subfolder1': {
                          'sub-subfolder1': {
                            'file.yml': {
                              'size': '6kb',
                              'created': '12/21/2121'
                            },
                            'file.json': {
                              'size': '8kb',
                              'created': '11/11/2011'
                            }
                          },
                          'file.rs': {
                            'size': '15kb',
                            'created': '10/20/2020'
                          },
                          'file.go': {
                            'size': '9kb',
                            'created': '10/20/2020'
                          },
                          'file.cpp': {
                            'size': '9kb',
                            'created': '10/20/2020'
                          },
                        },
                        'subfolder2': {
                          'file.docx': {
                            'size': '110kb',
                            'created': '10/20/2020'
                          },
                          'file.pptx': {
                            'size': '90kb',
                            'created': '10/20/2020'
                          },
                        },
                        'file.js': {
                          'size': '30kb',
                          'created': '10/20/2020'
                        },
                        'file.py': {
                          'size': '15kb',
                          'created': '01/02/2121'
                        }
                      }}
                      renderNode={(node, path) => 'size' in node && 'created' in node
                        ? (
                          <div className={classes.fileInTree}>
                            <span>{last(path)}</span>
                            <span>{node.size}</span>
                          </div>
                        )
                        : null}
                      open={true}
                    />
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