import React, { PureComponent } from 'react';
import Tool from './Tool/tool';

class Toolbar extends PureComponent {
    render() {
            return <Tool
                click={() => this.props.clicked()}
            />
    }
}

export default Toolbar;