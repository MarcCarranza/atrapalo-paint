import React, { PureComponent } from 'react';
import Auxiliar from '../../../hoc/auxiliar';
import classes from './color.module.css';

class Color extends PureComponent {
    render () {
        return(
        <Auxiliar>
            <button
                onClick={this.props.click} 
                className={classes.colorButton} 
                style={{backgroundColor: this.props.colorCode}}></button>
        </Auxiliar>
        )    
    }
}

export default Color;