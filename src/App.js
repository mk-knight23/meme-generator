import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Footer from './Footer';
import Header from './Header';
import MemeGenerator from './MemeGenerator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6441a5',
    },
    secondary: {
      main: '#e91e63',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: 12,
      },
    },
    MuiButton: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app-container'>
        <Header />
        <MemeGenerator />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
