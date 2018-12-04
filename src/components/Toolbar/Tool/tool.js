import React, { PureComponent } from 'react';
import Auxiliar from '../../../hoc/auxiliar';

class Tool extends PureComponent {
    render () {
        return(
        <Auxiliar>
            <button
                onClick={this.props.click}>
                Deshacer
            </button>
        </Auxiliar>
        )    
    }
}

export default Tool;