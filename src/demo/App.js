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

class App extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div style={{ padding: '1em' }}>
        <div id="Buttons" style={{
          backgroundColor: '#085279',
          color: 'white',
          height: '100%',
          padding: '1em'
        }}>
          <h1>Buttons</h1>
          <Button>Root</Button>
          <GradientButton>GradientButton</GradientButton>
          <OutlineButton color="white">OutlineButton</OutlineButton>
          <AccentButton>AccentButton</AccentButton>
        </div>
        <div id="PaperCard" style={{
          height: '100%'
        }}>
          <h1>Paper</h1>
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
          <h1>Forms</h1>
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
      </div>
    )
  }
}

export default (App);