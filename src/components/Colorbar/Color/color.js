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
            <button className={classes.colorButton}></button>
        </Auxiliar>
        )    
    }
}

export default Color;