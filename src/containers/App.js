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
      colors: [],                       // Array de colores disponibles (se rellenan en componentWillMount())
      actualColor: "hsl(0, 75%, 0%)",  // Color actual del dibujo
      lineWidths: [2, 3, 4, 5],         // Grosores disponibles
      actualWidth: 2,     // Grosor actual del dibujo
      undo: 0,            // Variable para que detecte deshacer/rehacer (le añade o resta)
      undoEnabled: false, // Variable para que deshacer se active/desactive
      redoEnabled: false  // Variable para que rehacer se active/desactive
    };
  }

  // Función para crear una paleta de colores más que básica
  componentWillMount() {
    let colorArray = [];
    let i = 0; // For colors
    let j = 100; // For greys
    while( j > 0){
      let color = "hsl(0, 0%, "+ j +"%)";
      colorArray.push(color);
      j -= 25;
    }
    while (i < 360) {
      let color = "hsl(" + i + ", 75%, 50%)"; 
      colorArray.push(color);
      i += 20;
    }
    this.setState({
      colors: colorArray
    });
  }

  // Handler que se encarga de actualizar el color del dibujo
  changeColorHandler = colorCode => {
    this.setState({ actualColor: colorCode });
  };

  // Handler que se encarga de actualizar la amplitud del dibujo
  changeWidthHandler = width => {
    this.setState({ actualWidth: width })
  };

  // Handler para actualizar undo y que canvas lo detecte (como comentado anteriormente, esto es una chapuza y se ha de cambiar)
  undoHandler = () =>{
    let updatedUndo = this.state.undo;
    updatedUndo++;
    this.setState({
      undo: updatedUndo
    })
  }

  // Handler para actualizar undo y que canvas lo detecte (como comentado anteriormente, esto es una chapuza y se ha de cambiar)
  redoHandler = () => {
    let updatedUndo = this.state.undo;
    updatedUndo--;
    this.setState({
      undo: updatedUndo
    })
  }

  // Handler para activar/desactivar los botones de hacer y deshacer
  undoEnabledHandler = (undoEnabled, redoEnabled) => {
    this.setState({
      undoEnabled: undoEnabled,
      redoEnabled: redoEnabled
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
          undoEnabled={this.state.undoEnabled}
          redoEnabled={this.state.redoEnabled}
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
          strokeColor={this.state.actualColor}
          strokeWidth={this.state.actualWidth}
          undo={this.state.undo}
          click={this.undoEnabledHandler}
        />
      </div>
    );
  }
}

export default App;
