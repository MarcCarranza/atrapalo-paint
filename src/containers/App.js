import React, { Component } from 'react';
import classes from './App.module.css';
import Colorbar from '../components/Colorbar/colorbar';
import Canvas from '../components/Canvas/canvas';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      colors: [],
      lineWidth: 1
    }
  }
  
  componentWillMount(){
    this.setState({
      colors: this.colorsGenerator()
    });
  }

  colorsGenerator(){
    let colorArray = [];
    let i = 0;
    while( i < 360 ){
      colorArray.push(i);
      i += 30;
    }
    return colorArray;
  }

  render() {
    return (
      <div className = {classes.App}>

        <Canvas className={classes.Canvas} stroke={"hsl("+ this.state.colors[5] +", 75%, 50%)"}></Canvas>
      </div>
    );
  }
}

export default App;
