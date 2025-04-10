import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    textAlign: 'center',
    background: 'linear-gradient(to right, #2a0845, #6441a5)',
    color: 'white',
    borderRadius: theme.spacing(1),
  },
  link: {
    color: '#fff',
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.secondary.light,
    },
  }
}));

function Footer() {
  const classes = useStyles();
  
  return (
    <Paper component="footer" className={classes.footer}>
      <Typography variant="body1">
        Created with ❤️ | Check out more projects on{' '}
        <a 
          href="https://github.com/mk-knight23" 
          target="_blank" 
          rel="noopener noreferrer"
          className={classes.link}
        >
          GitHub
        </a>
      </Typography>
    </Paper>
  );
}

export default Footer;
