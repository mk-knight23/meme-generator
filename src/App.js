import React from 'react';
import Footer from './Footer';
import Header from './Header';
import MemeGenerator from './MemeGenerator';

function App() {
  return (
    <div className='app-container'>
      <Header />
      <MemeGenerator  />
      <Footer/>
    </div>
  );
}

export default App;
