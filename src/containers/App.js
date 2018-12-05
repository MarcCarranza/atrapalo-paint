import React, { Component } from "react";
import classes from "./App.module.css";
import Colorbar from "../components/Colorbar/colorbar";
import Canvas from "../components/Canvas/canvas";
import WidthSelector from "../components/LineWidth/linewidth";
import Toolbar from "../components/Toolbar/toolbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      actualColor: 0,
      lineWidths: [2, 3, 4, 5],
      actualWidth: 2,
      undo: 0
    };
  }

  componentWillMount() {
    let colorArray = [];
    let i = 0;
    while (i < 360) {
      colorArray.push(i);
      i += 20;
    }
    this.setState({
      colors: colorArray
    });
  }

  changeColorHandler = colorCode => {
    this.setState({ actualColor: colorCode });
  };

  changeWidthHandler = width => {
    this.setState({ actualWidth: width })
  };

  undoHandler = () =>{
    let updatedUndo = this.state.undo;
    updatedUndo++;
    this.setState({
      undo: updatedUndo
    })
  }

  redoHandler = () => {
    let updatedUndo = this.state.undo;
    updatedUndo--;
    this.setState({
      undo: updatedUndo
    })
  }

  render() {
    return (
      <div className={classes.App}>
        <Toolbar
          clicked={
            { 
              undo: this.undoHandler, 
              redo: this.redoHandler
            }
          }
        />
        <Colorbar
          colors={this.state.colors}
          clicked={this.changeColorHandler}
        />
        <WidthSelector 
          lineWidths={this.state.lineWidths} 
          clicked={this.changeWidthHandler}
        />
        <Canvas
          className={classes.Canvas}
          strokeColor={"hsl(" + this.state.actualColor + ", 75%, 50%)"}
          strokeWidth={this.state.actualWidth}
          undo={this.state.undo}
        />
      </div>
    );
  }
}

export default App;
