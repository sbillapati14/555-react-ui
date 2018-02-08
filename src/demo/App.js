import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

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
import TextField from '../lib/TextField';
import MenuList from '../lib/DropDown/MenuList';
import Switch from '../lib/Switch/Switch';
import NestedList from '../lib/DropDown/NestedList';
import FilterStatus from '../lib/DropDown/FilterStatus';
import SelectList, { SelectListItem } from '../lib/SelectList';
import SideNav, { SideNavSection, SideNavOption } from '../lib/SideNav';

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

    return (
      <AppWrapper render={({ isMobileOpen, toggleDrawer }) => {

        return (
          <AppFrame>

            <AppBar title="yolo" isMobileOpen={isMobileOpen} toggleDrawer={toggleDrawer}>
              <MenuList />
            </AppBar>

            <AppDrawer title="IRIS| Portal" isMobileOpen={isMobileOpen}>

              <nav>
                <SelectList name="selectedApplication" value={selectedApplication} onChange={this.handleChange}>
                  <SelectListItem value="yolo_app">Yolo App</SelectListItem>
                  <SelectListItem value="1_app">Test App</SelectListItem>
                  <SelectListItem value="3">Funny App</SelectListItem>
                </SelectList>

                <SideNav>
                  {/* this is out menu with nested also */}
                  <SideNavSection leftIcon={<InboxIcon height="20" />} label="Auth Types" onCLick={() => { }} open={true}>
                    <SideNavOption primary="Server API Endpoints" />
                    <SideNavOption primary="Report a Problem" />
                    <SideNavOption primary="API Status" />
                    <SideNavOption primary="Call Trace" />
                  </SideNavSection>
                </SideNav>
              </nav>
            </AppDrawer>

            <AppContent isMobileOpen={isMobileOpen}>


              <Typography type="display4" gutterBottom>Components</Typography>

              <div id="Buttons" style={{
                backgroundColor: '#085279',
                color: 'white',
                padding: '1em'
              }}>
                <Typography type="display3" gutterBottom>Buttons</Typography>
                <Button>Root</Button>
                <GradientButton>GradientButton</GradientButton>
                <OutlineButton color="white">OutlineButton</OutlineButton>
                <AccentButton>AccentButton</AccentButton>
              </div>
              <div id="PaperCard">
                <Typography type="display3" gutterBottom>Paper</Typography>
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

              <div id='Forms'>
                <Typography type="display3" gutterBottom>Forms</Typography>
                <PaperCard>
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
                  </form>
                </PaperCard>
              </div>

              <div id='Switch'>
                <Typography type="display3" gutterBottom>Switch</Typography>
                <Switch></Switch>
              </div>

              <div id='FilterStatus'>
                <Typography type="display3" gutterBottom>Filters</Typography>
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