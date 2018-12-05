import React, { Component } from 'react';
import Tool from './Tool/tool';

class Toolbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttons: [
                "Deshacer",
                "Rehacer"
            ] 
        }
    }
    render() {
        return this.state.buttons.map( (button, index) => {
            return <Tool
                key={index}
                click={() => this.props.clicked()}
                buttonText={button}
            />
        } );
    }
}

export default Toolbar;