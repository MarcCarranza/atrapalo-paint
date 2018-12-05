import React, { Component } from "react";

class Undo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Deshacer"
    };
  }
  render() {
    if(this.props.enabled){
        return <button 
            onClick={this.props.click}>
            {this.state.buttonText}
        </button>
    }else{
        return <button 
            onClick={this.props.click}
            disabled={true}>
            {this.state.buttonText}
        </button>
    }
  }
}

export default Undo;
