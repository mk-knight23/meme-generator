import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Button, Slider, IconButton, TextField, Paper } from '@material-ui/core';
import { GetApp, Favorite, ColorLens, Collections } from '@material-ui/icons';
import FavoritesDrawer from './FavoritesDrawer';

export default class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: '',
      bottomText: '',
      randomImage: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: [],
      fontSize: 40,
      textColor: '#ffffff',
      favorites: [],
      topOffset: 15,
      bottomOffset: 15,
      drawerOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.generate = this.generate.bind(this);
    this.downloadMeme = this.downloadMeme.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
        const savedFavorites = localStorage.getItem('memeFavorites');
        if (savedFavorites) {
          this.setState({ favorites: JSON.parse(savedFavorites) });
        }
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  generate(e) {
    e.preventDefault();
    const imageArrayLength = this.state.allMemeImgs.length;
    const randomNumber = Math.floor(Math.random() * imageArrayLength);
    this.setState(prevState => ({
      randomImage: prevState.allMemeImgs[randomNumber].url
    }));
    toast.success('New meme template generated!', {
      position: "bottom-right",
      autoClose: 2000
    });
  }

  downloadMeme() {
    const meme = document.querySelector('.meme');
    html2canvas(meme).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, 'my-meme.png');
        toast.success('Meme downloaded successfully!');
      });
    });
  }

  addToFavorites() {
    this.setState(prevState => {
      const newFavorites = [...prevState.favorites, {
        image: prevState.randomImage,
        topText: prevState.topText,
        bottomText: prevState.bottomText
      }];
      localStorage.setItem('memeFavorites', JSON.stringify(newFavorites));
      toast.info('Added to favorites!');
      return { favorites: newFavorites };
    });
  }

  deleteFavorite(index) {
    this.setState(prevState => {
      const newFavorites = [...prevState.favorites];
      newFavorites.splice(index, 1);
      localStorage.setItem('memeFavorites', JSON.stringify(newFavorites));
      toast.info('Removed from favorites');
      return { favorites: newFavorites };
    });
  }

  toggleDrawer() {
    this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }));
  }

  render() {
    return (
      <Paper elevation={3} className="meme-container">
        <form className='meme-form' onSubmit={this.generate}>
          <TextField
            variant="outlined"
            name="topText"
            label="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            name="bottomText"
            label="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <div className="controls">
            <div className="slider-container">
              <label>Font Size:</label>
              <Slider
                value={this.state.fontSize}
                onChange={(e, newValue) => this.setState({ fontSize: newValue })}
                min={20}
                max={80}
              />
            </div>
            <div className="color-picker">
              <ColorLens />
              <input
                type="color"
                value={this.state.textColor}
                onChange={(e) => this.setState({ textColor: e.target.value })}
              />
            </div>
            <div className="position-controls">
              <Slider
                orientation="vertical"
                value={this.state.topOffset}
                onChange={(e, newValue) => this.setState({ topOffset: newValue })}
                min={0}
                max={50}
              />
              <Slider
                orientation="vertical"
                value={this.state.bottomOffset}
                onChange={(e, newValue) => this.setState({ bottomOffset: newValue })}
                min={0}
                max={50}
              />
            </div>
          </div>
          <div className="button-group">
            <Button variant="contained" color="primary" type="submit">
              Generate
            </Button>
            <IconButton onClick={this.downloadMeme} color="primary" title="Download meme">
              <GetApp />
            </IconButton>
            <IconButton onClick={this.addToFavorites} color="secondary" title="Add to favorites">
              <Favorite />
            </IconButton>
            <IconButton onClick={this.toggleDrawer} color="default" title="View favorites">
              <Collections />
            </IconButton>
          </div>
        </form>
        <div className="meme">
          <img src={this.state.randomImage} alt="" />
          <h2 
            className="top" 
            style={{
              fontSize: `${this.state.fontSize}px`,
              color: this.state.textColor,
              top: `${this.state.topOffset}px`
            }}
          >
            {this.state.topText}
          </h2>
          <h2 
            className="bottom"
            style={{
              fontSize: `${this.state.fontSize}px`,
              color: this.state.textColor,
              bottom: `${this.state.bottomOffset}px`
            }}
          >
            {this.state.bottomText}
          </h2>
        </div>
        <FavoritesDrawer 
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer}
          favorites={this.state.favorites}
          onDelete={this.deleteFavorite}
        />
        <ToastContainer />
      </Paper>
    );
  }
}
