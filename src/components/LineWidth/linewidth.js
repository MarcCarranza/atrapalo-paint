import React, { Component } from "react";
import Width from "./Width/width";
import classes from "./linewidth.module.css";

class lineWidth extends Component {
  render() {
    return (
      <div className="lineWidth">
        {this.props.lineWidths.map((width, index) => {
          return (
            <Width
              key={index}
              width={width}
              click={() => this.props.clicked(width)}
            />
          );
        })}
      </div>
    );
  }
}

export default lineWidth;
