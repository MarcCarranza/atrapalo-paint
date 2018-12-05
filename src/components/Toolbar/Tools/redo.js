import React, { Component } from 'react';

class Undo extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonText: "Rehacer"
        }
    }
    render () {
        return(
            <button
                onClick={this.props.click}>
                {this.state.buttonText}
            </button>
        )    
    }
}

export default Undo;