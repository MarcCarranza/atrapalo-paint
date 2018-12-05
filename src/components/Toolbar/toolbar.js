import React, { PureComponent } from "react";
import Undo from "./Tools/undo";
import Redo from "./Tools/redo";

class Toolbar extends PureComponent {
  render() {
    return (
      <>
        <Undo click={() => this.props.clicked.undo()} />
        <Redo click={() => this.props.clicked.redo()} />
      </>
    );
  }
}

export default Toolbar;
