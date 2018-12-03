import React, { Component } from 'react';
import Auxiliar from '../../../hoc/auxiliar';
import classes from './color.module.css';

class Color extends Component {
    constructor(props){
        super(props);
    }

    render () {
        return(
        <Auxiliar>
            <button
                onClick={this.props.click} 
                className={classes.colorButton} 
                style={{backgroundColor: "hsl("+ this.props.colorCode +", 75%, 50%)"}}></button>
        </Auxiliar>
        )    
    }
}

export default Color;