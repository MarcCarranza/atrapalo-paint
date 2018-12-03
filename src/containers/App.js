import React, { Component } from 'react';
import classes from './App.module.css';
import Canvas from '../components/Canvas/canvas';

class App extends Component {
  render() {
    return (
      <div className = {classes.App}>
        <Canvas className={classes.Canvas}></Canvas>
      </div>
    );
  }
}

export default App;
