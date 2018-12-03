import React, { Component } from 'react';
import classes from './App.module.css';
import Colorbar from '../components/Colorbar/colorbar';
import Canvas from '../components/Canvas/canvas';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      colors: [],
      actualColor: 0,
      lineWidth: 1
    }
  }
  
  componentWillMount(){
    this.setState({
      colors: this.colorsGenerator(),
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

  deletePersonHandler = ( colorCode ) => {
    this.setState( { actualColor: colorCode } );
  }


  render() {
    return (
      <div className = {classes.App}>
        <Colorbar 
          colors={this.state.colors} 
          clicked={this.deletePersonHandler}
        />
        <Canvas 
          className={classes.Canvas} 
          stroke={"hsl("+ this.state.actualColor +", 75%, 50%)"}
        />
      </div>
    );
  }
}

export default App;
