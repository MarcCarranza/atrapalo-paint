import React, { PureComponent } from 'react';
import Auxiliar from '../../../hoc/auxiliar';
import classes from './width.module.css';

class Width extends PureComponent {
    render () {
        return(
        <Auxiliar>
            <button
                onClick={this.props.click} 
                className={classes.widthButton} 
                style={{height: this.props.width * 2}}></button>
        </Auxiliar>
        )    
    }
}

export default Width;