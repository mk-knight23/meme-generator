import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  IconButton,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 320,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 320,
    padding: theme.spacing(2),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  favoriteItem: {
    border: '1px solid #eee',
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
    position: 'relative',
  },
  favoriteImage: {
    width: '100%',
    borderRadius: theme.spacing(1),
  },
  memeText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    textShadow: '2px 2px 0 #000',
    fontFamily: 'impact, sans-serif',
    textTransform: 'uppercase',
  },
  topText: {
    top: theme.spacing(1),
  },
  bottomText: {
    bottom: theme.spacing(1),
  },
  deleteButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
}));

const FavoritesDrawer = ({ open, onClose, favorites, onDelete }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h6">Favorite Memes</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </div>
      <List>
        {favorites.map((meme, index) => (
          <ListItem key={index} className={classes.favoriteItem}>
            <div style={{ position: 'relative', width: '100%' }}>
              <img src={meme.image} alt="" className={classes.favoriteImage} />
              <Typography className={`${classes.memeText} ${classes.topText}`}>
                {meme.topText}
              </Typography>
              <Typography className={`${classes.memeText} ${classes.bottomText}`}>
                {meme.bottomText}
              </Typography>
              <IconButton
                size="small"
                className={classes.deleteButton}
                onClick={() => onDelete(index)}
              >
                <Delete />
              </IconButton>
            </div>
          </ListItem>
        ))}
        {favorites.length === 0 && (
          <Typography variant="body2" color="textSecondary" align="center">
            No favorite memes yet
          </Typography>
        )}
      </List>
    </Drawer>
  );
};

export default FavoritesDrawer;