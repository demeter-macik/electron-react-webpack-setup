import React from 'react';
import DataTableComponent from './data-table.js';

const Components = [DataTableComponent];

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            windows: ['table'],
            activeWindow: 0
        };
        this.handleSelectWindow = this.handleSelectComponent.bind(this);
    }

    handleSelectComponent(event) {
        const index = event.currentTarget.getAttribute('data-key');
        if (index && index >= 0 && index < Components.length) {
            this.setState({
                activeWindow: index
            });
        }
    }

    render() {
        const Container = Components[this.state.activeWindow];
        return (
            <Container />
        );
    }
}

export default Container;