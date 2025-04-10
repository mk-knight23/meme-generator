import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { SentimentVerySatisfied } from '@material-ui/icons';

function Header() {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <SentimentVerySatisfied style={{ fontSize: 40, marginRight: 16 }} />
        <div>
          <Typography variant="h4">Meme Generator</Typography>
          <Typography variant="subtitle1" style={{ opacity: 0.8 }}>
            Create and customize your memes
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
