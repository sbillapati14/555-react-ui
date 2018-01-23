import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';

import OutlineButton from '../lib/Button/OutlineButton';
import GradientButton from '../lib/Button/GradientButton';
import AccentButton from '../lib/Button/AccentButton';
import PaperCard from '../lib/PaperCard';
import TextField from '../lib/TextField';
import MenuList from '../lib/DropDown/MenuList';
import Switch from '../lib/Switch/Switch';
import NestedList from '../lib/DropDown/NestedList';
import FilterStatus from '../lib/DropDown/FilterStatus';


class App extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div style={{ padding: '1em' }}>

        <Typography type="display4" gutterBottom>Components</Typography>

        <div id="Buttons" style={{
          backgroundColor: '#085279',
          color: 'white',
          height: '100%',
          padding: '1em'
        }}>
          <Typography type="display3" gutterBottom>Buttons</Typography>
          <Button>Root</Button>
          <GradientButton>GradientButton</GradientButton>
          <OutlineButton color="white">OutlineButton</OutlineButton>
          <AccentButton>AccentButton</AccentButton>
        </div>
        <div id="PaperCard" style={{
          height: '100%'
        }}>
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

        <div id='Forms' style={{
          height: '100%'
        }}>
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

        <div id='Switch' style={{
          height: '100%'
        }}>
          <Typography type="display3" gutterBottom>Switch</Typography>
          <Switch></Switch>
        </div>

        <div id='FilterStatus' style={{
          height: '100%'
        }}>
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
      </div>
    )
  }
}

export default (App);