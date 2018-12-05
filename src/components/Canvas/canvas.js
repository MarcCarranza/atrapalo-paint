import React, { Component } from "react";
import { Stage, Layer, Line } from "react-konva";
import classes from "./canvas.module.css";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],        // Array donde guardar las lineas
      savedLines: [],   // Array donde guardar las lineas cuando se llama a deshacer
      linesConfig: [],  // Array donde guardar la configuracion de las lineas
      savedLinesConfig: [],               // Array donde guardar la configuracion de las lineas al deshacer
      width: window.innerWidth * 0.7,     // Variable para calcular el ancho del canvas
      height: window.innerHeight * 0.8    // Variable para calcular la altura del canvas
    };
  }

  // Añade un event listener que llama a canvasResize()
  componentDidMount() {
    window.addEventListener("resize", this.canvasResize());
  }

  // Comprueba si ha cambiado el estado de undo/redo y lo actualiza acorde a la acción (esto debe irse)
  componentDidUpdate(prevProps) {
    if (prevProps.undo < this.props.undo) {
      this.handleUndo();
    } else if (prevProps.undo > this.props.undo) {
      this.handleRedo();
    }
  }

  // Función para que el canvas sea responsive
  canvasResize = () => {
    this.setState({
      width: window.innerWidth * 0.7,
      height: window.innerHeight * 0.8
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

    this.props.click(undo, redo);
  };

  // Función para organizar las acciones de deshacer
  handleUndo = () => {
    this.saveOldLines();
    this.saveOldLinesConfig();
  };

  // Función que guarda las lineas en otro array cuando llama a deshacer
  saveOldLines = () => {
    let newLines = this.state.lines;
    let lineToSave = newLines[newLines.length - 1];
    let oldLines = this.state.savedLines;
    oldLines.push(lineToSave);
    newLines.splice(newLines.length - 1, 1);
    this.setState({
      lines: newLines,
      savedLines: oldLines
    });
  };

  // Función que guarda la configuración de las lineas cuando se llama a deshacer
  saveOldLinesConfig = () => {
    let newLinesConfig = this.state.linesConfig;
    let lineConfigToSave = newLinesConfig[newLinesConfig.length -1];
    let oldLinesConfig = this.state.savedLinesConfig;
    oldLinesConfig.push(lineConfigToSave);
    newLinesConfig.splice(newLinesConfig.length - 1, 1);
    this.setState({
      linesConfig: newLinesConfig,
      savedLinesConfig: oldLinesConfig
    })
  }

  // Función para organizar las acciones de rehacer (por aquí he perdido la esperanza)
  handleRedo = () => {
    this.restoreOldLines();
    this.restoreOldLinesConfig();
  };

  // Función que restora las lineas cuando se llama a rehacer
  restoreOldLines = () => {
    if (this.props.undo >= 0) {
      let newLines = this.state.lines;
      let redoLine = this.state.savedLines[this.state.savedLines.length - 1];
      let oldLines = this.state.savedLines;
      newLines.push(redoLine);
      oldLines.splice(oldLines.length - 1, 1);
      this.setState({
        lines: newLines,
        savedLines: oldLines
      });
    }
  }

  // Función que restora la configuración de las lineas cuando se llama a rehacer
  restoreOldLinesConfig = () => {
    if (this.props.undo >= 0) {
      let newLinesConfig = this.state.linesConfig;
      let redoLineConfig = this.state.savedLinesConfig[this.state.savedLinesConfig.length - 1];
      let oldLinesConfig = this.state.savedLinesConfig;
      newLinesConfig.push(redoLineConfig);
      oldLinesConfig.splice(oldLinesConfig.length - 1, 1);
      this.setState({
        linesConfig: newLinesConfig,
        savedLinesConfig: oldLinesConfig
      });
    }
  }

  // Función que se encarga de detectar si el canvas está siendo presionado y hacer un spread para mostrar las lineas
  handleMouseDown = () => {
    this.saveLinesConfig();
    this._drawing = true;
    this.setState({
      lines: [...this.state.lines, []]
    });
  };

  // Función que se encarga de detectar el movimiento del ratón y guarda las lineas
  handleMouseMove = e => {
    this.enableUndoRedo();
    if (!this._drawing) {
      return;
    }
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();
    const { lines } = this.state;

    let lastLine = lines[lines.length - 1];
    lastLine = lastLine.concat([point.x, point.y]);

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

  render() {
    return (
      <div className={classes.Canvas}>
        <Stage
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
