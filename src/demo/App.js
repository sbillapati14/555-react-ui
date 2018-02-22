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

import AppWrapper from '../lib/AppWrapper';
import AppFrame from '../lib/AppFrame';
import AppBar from '../lib/AppBar';
import AppDrawer from '../lib/AppDrawer';
import AppContent from '../lib/AppContent';

import OutlineButton from '../lib/Button/OutlineButton';
import GradientButton from '../lib/Button/GradientButton';
import AccentButton from '../lib/Button/AccentButton';
import PaperCard from '../lib/PaperCard';
import { TextField, FormField } from '../lib/InputFields';
import MenuList from '../lib/DropDown/MenuList';
import Switch from '../lib/Switch/Switch';
import NestedList from '../lib/DropDown/NestedList';
import FilterStatus from '../lib/DropDown/FilterStatus';
import SelectList, { SelectListItem } from '../lib/SelectList';
import SideNav, { SideNavSection, SideNavOption } from '../lib/SideNav';
import Select from 'material-ui/Select';
const styles = theme => ({

})

class App extends Component {

  state = {
    selectedApplication: '',
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const { selectedApplication } = this.state;
    const select = <Select
            native
            value="25"
            inputProps={{
              id: 'age-native-simple',
            }}
          >
            <option value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>;
    return (
      <AppWrapper render={({ isMobileOpen, toggleDrawer }) => {

        return (
          <AppFrame>

            <AppBar title="yolo" isMobileOpen={isMobileOpen} toggleDrawer={toggleDrawer}>
              <MenuList />
            </AppBar>

            <AppDrawer title="IRIS| Portal" isMobileOpen={isMobileOpen}>

              <Router>
                <nav>
                  <SelectList name="selectedApplication" value={selectedApplication} onChange={this.handleChange}>
                    <SelectListItem value="yolo_app">Yolo App</SelectListItem>
                    <SelectListItem value="1_app">Test App</SelectListItem>
                    <SelectListItem value="3">Funny App</SelectListItem>
                  </SelectList>

                  <SideNav>
                    {/* this is out menu with nested also */}
                    <SideNavSection component={NavLink} to="/stand-alone-nav-section" leftIcon={<InboxIcon height="20" />} label="Section NavLink" />
                    <SideNavSection leftIcon={<InboxIcon height="20" />} label="Auth Types" >
                      <SideNavOption component={NavLink} to="/page-one" primary="Server API Endpoints" />
                      <SideNavOption component={NavLink} to="/page-two" primary="Report a Problem" />
                      <SideNavOption component={NavLink} to="/page-three" primary="API Status" />
                      <SideNavOption component={NavLink} to="/page-four" primary="Call Trace" />
                      <SideNavOption primary="Not A Link" />
                    </SideNavSection>
                    <SideNavSection leftIcon={<InboxIcon height="20" />} label="More Options" >
                      <SideNavOption component={NavLink} to="/page-one" primary="Server API Endpoints" />
                      <SideNavOption component={NavLink} to="/page-two" primary="Report a Problem" />
                      <SideNavOption component={NavLink} to="/page-three" primary="API Status" />
                      <SideNavOption component={NavLink} to="/page-four" primary="Call Trace" />
                      <SideNavOption primary="Not A Link" />
                    </SideNavSection>
                  </SideNav>
                </nav>
              </Router>
            </AppDrawer>

            <AppContent isMobileOpen={isMobileOpen}>


              <Typography variant="display4" gutterBottom>Components</Typography>

              <div id="Buttons" style={{
                backgroundColor: '#085279',
                color: 'white',
                padding: '1em'
              }}>
                <Typography variant="display3" gutterBottom>Buttons</Typography>
                <Button>Root</Button>
                <GradientButton>GradientButton</GradientButton>
                <OutlineButton color="white">OutlineButton</OutlineButton>
                <AccentButton>AccentButton</AccentButton>
              </div>
              <div id="PaperCard">
                <Typography variant="display3" gutterBottom>Paper</Typography>
                <PaperCard
                  title="Here is the title"
                  avatar={
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  }
                  style={{ width: '500px' }}
                >
                  <Typography>
                    Here is the content of the PaperCard
              </Typography>
                </PaperCard>
              </div>

              <div id='Switch'>
                <Typography variant="display3" gutterBottom>Switch</Typography>
                <Switch></Switch>
              </div>

              {/*<div id='FormField'>
                <Typography variant="display3" gutterBottom>Forms</Typography>
                 <FormField component={select}/>
                 <FormField/>
              </div>*/}
              <div id='Forms'>
                  <Typography type="display3" gutterBottom>Forms</Typography>
                  <PaperCard
                    title="Acme Application Details"
                    avatar={
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    }
                  >
                <form>
                  <FormField label="App Domain" default="Example" disable={false}/>
                  <FormField id="Disable" label="Federation Type" default="Disable input" disable={true}/>
                  <FormField id="secret" label="App Secret" default="abc"/>
                  <FormField id="key" label="App Key" default="sdfasfsadf"/>
                  <FormField id="app" label="App" default="aa"/>
                </form>
                </PaperCard>
             </div>
              <div id='FilterStatus'>
                <Typography variant="display3" gutterBottom>Filters</Typography>
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
              </div>

            </AppContent>
          </ AppFrame>)
      }} />
    )
  }
}

export default withStyles(styles)(App);