import React, { Component } from "react";
import { Stage, Layer, Line } from "react-konva";
import classes from "./canvas.module.css";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      linesConfig: [],
      width: window.innerWidth * 0.7,
      height: window.innerHeight * 0.8
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.canvasResize());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.undo < this.props.undo) {
      this.handleUndo();
    } else if (prevProps.undo > this.props.undo) {
      this.handleRedo();
    }
  }

  canvasResize = () => {
    this.setState({
      width: window.innerWidth * 0.7,
      height: window.innerHeight * 0.8
    });
  };

  handleUndo = () => {
    let newLines = this.state.lines;
    newLines.splice(newLines.length - 1, 1);
    this.setState({
      lines: newLines
    });
  };

  handleRedo = () => {};

  handleMouseDown = () => {
    this.saveLinesConfig();
    this._drawing = true;
    this.setState({
      lines: [...this.state.lines, []]
    });
  };

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

  handleMouseMove = e => {
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

  handleMouseUp = () => {
    this._drawing = false;
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
