import React, { PureComponent } from 'react';
import Auxiliar from '../../../hoc/auxiliar';

class Tool extends PureComponent {
    render () {
        return(
        <Auxiliar>
            <button
                onClick={this.props.click}>
                {this.props.buttonText}
            </button>
        </Auxiliar>
        )    
    }
}

export default Tool;