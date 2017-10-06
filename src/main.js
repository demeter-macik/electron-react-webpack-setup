import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from './components/container.js';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Container />
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(< App />,
    document.getElementById('content')
);

export default App;