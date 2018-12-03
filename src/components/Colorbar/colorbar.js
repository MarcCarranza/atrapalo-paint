import React, { PureComponent } from 'react';
import Color from './Color/color';

class Colorbar extends PureComponent {
    constructor(props){
        super (props);
    }
    render() {
        return this.props.colors.map( (color, index) => {
            return <Color
                click={() => this.props.clicked( color )}
                key = {index}
                colorCode = {color}    
            />
        } );
    }
}

export default Colorbar;