import React, { Component } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import classes from './canvas.module.css';

class Canvas extends Component {
  constructor(props){
    super(props);
    this.state = {
      lines: [],
      lineColors: [],
      width: window.innerWidth * .7,
      height: window.innerHeight * .8
    };
  }

  
  componentDidMount(){
    window.addEventListener("resize", this.canvasResize());
  }

  canvasResize(){
    this.setState({
      width: window.innerWidth * .7,
      height: window.innerHeight * .8
    })
  }

  handleMouseDown = () => {
    let color =  this.state.lineColors;
    color.push(this.props.stroke);
    this._drawing = true;
    this.setState({
      lines: [...this.state.lines, []],
      lineColors: color 
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
              <Line key={i} points={line} stroke={this.state.lineColors[i]} strokeWidth={this.props.strokeWidth} />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Canvas;