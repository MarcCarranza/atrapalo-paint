import React, { PureComponent } from "react";
import Undo from "./Tools/undo";
import Redo from "./Tools/redo";

class Toolbar extends PureComponent {
  render() {
    return (
      <div className="toolbar">
        <Undo click={() => this.props.clicked.undo()} enabled={this.props.undoEnabled}  />
        <Redo click={() => this.props.clicked.redo()} enabled={this.props.redoEnabled}/>
      </div>
    );
  }
}

export default Toolbar;
