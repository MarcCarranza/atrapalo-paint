import React, { Component } from 'react';
import classes from './buttons.module.css';

class Undo extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonText: "Rehacer"
        }
    }
    render() {
        if(this.props.enabled){
            return <button
                className={classes.Button}  
                onClick={this.props.click}>
                {this.state.buttonText}
            </button>
        }else{
            return <button
                className={classes.Button}  
                onClick={this.props.click}
                disabled={true}>
                {this.state.buttonText}
            </button>
        }
      }
}

export default Undo;