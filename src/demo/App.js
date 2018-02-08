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
import { TextField } from '../lib/InputFields';
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
                  <SideNavSection leftIcon={<InboxIcon height="20" />} label="Auth Types" open>
                    <SideNavOption primary="Server API Endpoints" />
                    <SideNavOption primary="Report a Problem" active />
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
                <PaperCard
                  title="Acme Application Details"
                  avatar={
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  }
                >
                  <form>
                    <label style={{
                      color: '#282828', display: 'inline-block',
                      marginTop: 16, fontSize: 14, fontWeight: 'bold',
                      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
                    }}>App Domain</label>
                    <TextField
                      id="Example"
                      margin="normal"
                      defaultValue="Example"
                      fullWidth={true}
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row', paddingLeft: 17,
                      }}
                    />

                    <label style={{
                      color: '#282828', display: 'inline-block',
                      marginTop: 16, marginBottom: 16, fontSize: 14, fontWeight: 'bold',
                      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
                    }}>Federation Type</label>
                    <TextField
                      id="Disabled"
                      fullWidth={true}
                      value="Disable input"
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row', paddingLeft: 17,
                      }}
                    />

                    <label style={{
                      color: '#282828', display: 'inline-block',
                      marginTop: 16, marginBottom: 16, fontSize: 14, fontWeight: 'bold',
                      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
                    }}>App Key</label>
                    <TextField
                      id="name"
                      fullWidth={true}
                      defaultValue="None"
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row', paddingLeft: 17,
                      }}
                    />

                    <label style={{
                      color: '#282828', display: 'inline-block',
                      marginTop: 16, marginBottom: 16, fontSize: 14, fontWeight: 'bold',
                      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
                    }}>App Secret</label>
                    <TextField
                      id="name"
                      fullWidth={true}
                      defaultValue="Default Value"
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row', paddingLeft: 17,
                      }}
                    />

                    <label style={{
                      color: '#282828', display: 'inline-block',
                      marginTop: 16, marginBottom: 16, fontSize: 14, fontWeight: 'bold',
                      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
                    }}>App </label>
                    <TextField
                      id="name"
                      fullWidth={true}
                      defaultValue="jhfghjgssfshgjksgd@*$&nv"
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row', paddingLeft: 17,
                      }}
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