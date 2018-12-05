import React, { PureComponent } from 'react';
import Color from './Color/color';

class Colorbar extends PureComponent {
    render() {
        return (
            <div className="colorBar">
            {this.props.colors.map( (color, index) => {
            return <Color
                click={() => this.props.clicked( color )}
                key = {index}
                colorCode = {color}    
            />
        })}
        </div>
        )
    }
}

export default Colorbar;