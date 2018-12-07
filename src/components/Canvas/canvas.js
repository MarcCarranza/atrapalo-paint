import React, { Component } from "react";
import { Stage, Layer, Line } from "react-konva";
import classes from "./canvas.module.css";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [], // Array donde guardar las lineas
      savedLines: [], // Array donde guardar las lineas cuando se llama a deshacer
      linesConfig: [], // Array donde guardar la configuracion de las lineas
      savedLinesConfig: [], // Array donde guardar la configuracion de las lineas al deshacer
    };
  }

  // Añade un event listener que llama a canvasResize()
  componentDidMount() {
    window.addEventListener("resize", this.canvasResize());
  }

  // Ejecuta funciones en funcion de si se ha actualizado el objeto
  componentDidUpdate(prevProps, prevState) {
    // Comprueba si el state es diferente al anterior y llama a enableUndoRedo()
    if (prevState !== this.state) {
      this.enableUndoRedo();
    }
    // Comprueba si undo es mayor o menos que antes y llama a la función correspondiente
    if (prevProps.undo < this.props.undo) {
      this.handleUndo();
    } else if (prevProps.undo > this.props.undo) {
      this.handleRedo();
    }
  }

  // Función para que el wrapper del canvas sea responsive (no vuelve al canvas responsive)
  canvasResize = () => {
    this.setState({
      width: window.innerWidth * 0.795,
      height: window.innerHeight * 0.845
    });
  };

  // Función que activa o desactiva los botones en función de su disponibilidad
  enableUndoRedo = () => {
    let undo, redo;
    if (this.state.lines.length === 0) {
      undo = false;
    } else if (this.state.lines.length > 0) {
      undo = true;
    }
    if (this.state.savedLines.length === 0) {
      redo = false;
    } else if (this.state.savedLines.length > 0) {
      redo = true;
    }
    // Pasa los datos a App.js para actualizar undoEnabled y redoEnabled
    this.props.click(undo, redo);
  };

  // Función para agrupar las acciones de deshacer
  handleUndo = () => {
    this.saveOldLines();
    this.saveOldLinesConfig();
  };

  // Función que guarda las lineas en otro array cuando llama a deshacer
  saveOldLines = () => {
    let newLines = this.state.lines; // Copia el array de lineas 
    let lineToSave = newLines[newLines.length - 1]; // Coge la última linea del array
    let oldLines = this.state.savedLines; // Copia el array de lineas guardadas al deshacer
    oldLines.push(lineToSave); // La guarda en la copia de lineas guardadas
    newLines.splice(newLines.length - 1, 1); // Quita la ultima linea del array principal
    this.setState({
      lines: newLines,
      savedLines: oldLines
    });
  };

  // Función que guarda la configuración de las lineas cuando se llama a deshacer 
  // Sigue la misma lógica que la función anterior pero con linesConfig
  saveOldLinesConfig = () => {
    let newLinesConfig = this.state.linesConfig;
    let lineConfigToSave = newLinesConfig[newLinesConfig.length - 1];
    let oldLinesConfig = this.state.savedLinesConfig;
    oldLinesConfig.push(lineConfigToSave);
    newLinesConfig.splice(newLinesConfig.length - 1, 1);
    this.setState({
      linesConfig: newLinesConfig,
      savedLinesConfig: oldLinesConfig
    });
  };

  // Función para agrupar las acciones de rehacer (por aquí he perdido la esperanza)
  handleRedo = () => {
    this.restoreOldLines();
    this.restoreOldLinesConfig();
  };

  // Función que restora las lineas cuando se llama a rehacer
  restoreOldLines = () => {
    // Comprueba que el array sea igual o más grande de 1 y undo igual o más grande que cero
    if (this.props.undo >= 0 && this.state.savedLines.length >= 1) { 
      let newLines = this.state.lines;  // Copia el array de lineas
      let redoLine = this.state.savedLines[this.state.savedLines.length - 1]; // Copia la linea a restorar
      let oldLines = this.state.savedLines; // Copia el array de lineas guardadas
      newLines.push(redoLine); // Introduce la linea 
      oldLines.splice(oldLines.length - 1, 1); // Borra la linea guardada en el array
      this.setState({
        lines: newLines,
        savedLines: oldLines
      });
    }
  };

  // Función que restora la configuración de las lineas cuando se llama a rehacer
  // La misma lógica que la función anterior
  restoreOldLinesConfig = () => {
    if (this.props.undo >= 0 && this.state.savedLinesConfig.length >= 1) {
      let newLinesConfig = this.state.linesConfig;
      let redoLineConfig = this.state.savedLinesConfig[
        this.state.savedLinesConfig.length - 1
      ];
      let oldLinesConfig = this.state.savedLinesConfig;
      newLinesConfig.push(redoLineConfig);
      oldLinesConfig.splice(oldLinesConfig.length - 1, 1);
      this.setState({
        linesConfig: newLinesConfig,
        savedLinesConfig: oldLinesConfig
      });
    }
  };

  // Función que se encarga de detectar si el canvas está siendo presionado y hacer un spread de las lineas
  handleMouseDown = () => {
    // Si hay alguna linea para rehacer y se pinta en el canvas de nuevo, purge it
    if (this.state.savedLinesConfig.length > 0) {
      this.purgeSavedLines();
      this.purgeSavedLinesConfig();
    }
    // Llama a saveLinesConfig();
    this.saveLinesConfig();
    // Drawing a true para que lo guarde en el array de lineas
    this._drawing = true;
    this.setState({
      lines: [...this.state.lines, []]
    });
  };

  // Función que se encarga de detectar el movimiento del ratón y guarda las lineas
  handleMouseMove = e => {
    // Si no está dibujando sale de la función
    if (!this._drawing) {
      return;
    }
    // Si está dibujando tiene en cuenta el punto inicial y final
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();
    const { lines } = this.state;

    let lastLine = lines[lines.length - 1];
    lastLine = lastLine.concat([point.x, point.y]);

    // Añade la linea al array
    lines.splice(lines.length - 1, 1, lastLine);
    this.setState({
      lines: lines.concat()
    });
  };

  // Función que detecta cuando se levanta el ratón
  handleMouseUp = () => {
    this._drawing = false;
  };

  // Guarda los datos (color, width) de las lineas en un array aparte
  saveLinesConfig = () => {
    let lineArray = this.state.linesConfig;
    let lineColor = this.props.strokeColor;
    let lineWidth = this.props.strokeWidth;
    let line = {
      lineColor,
      lineWidth
    };
    lineArray.push(line);
    this.setState({
      lineConfig: lineArray
    });
  };

  // Borra los datos del array de lineas guardadas al deshacer
  purgeSavedLines = () => {
    this.setState({
      savedLines: []
    });
  };

  // Borra los datos del array de configuracion de lineas guardadas al deshacer
  purgeSavedLinesConfig = () => {
    this.setState({
      savedLinesConfig: []
    });
  };

  render() {
    return (
      <div className={classes.CanvasWrapper}>
        <Stage
          className={classes.Canvas}
          width={this.state.width}
          height={this.state.height}
          onContentMousedown={this.handleMouseDown}
          onContentMousemove={this.handleMouseMove}
          onContentMouseup={this.handleMouseUp}
          ref={node => {
            this.stageRef = node;
          }}
        >
          <Layer>
            {this.state.lines.map((line, i) => (
              <Line
                key={i}
                points={line}
                stroke={this.state.linesConfig[i].lineColor}
                strokeWidth={this.state.linesConfig[i].lineWidth}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Canvas;
