import React, { PureComponent } from 'react';
import Auxiliar from '../../../hoc/auxiliar';
import classes from './width.module.css';

class Width extends PureComponent {
    render () {
        return(
        <Auxiliar>
            <div className={classes.widthWrap} onClick={this.props.click}>
                <button
                    className={classes.widthButton} 
                    style={{height: this.props.width * 2}}/>
            </div>
        </Auxiliar>
        )    
    }
}

export default Width;