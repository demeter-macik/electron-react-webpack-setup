import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const ipcRenderer = window.require('electron').ipcRenderer;

class DataTableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        ipcRenderer.send('get-data');
    }

    componentWillMount() {
        ipcRenderer.send('get-data');
    }

    componentDidMount() {
        this._mounted = true;
        let self = this;

        ipcRenderer.on('got-data', (event, data) => {
            if (this._mounted) {
                self.setState(function (state) {
                    state.data = data;
                }, function () {
                    // ipcRenderer.send('some-message');
                });
            }
        });
    }

    componentWillUnmount() {
        delete this._mounted;
        ipcRenderer.removeAllListeners('got-data', (event, arg) => { });
    }

    render() {

        let rows = this.state.data;
        const TableTemplate =
            <Table multiSelectable={true} selectable={false}>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Key</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableRowColumn>{row.key}</TableRowColumn>
                            <TableRowColumn>{row.name}</TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >;

        const style = {
            margin: 12,
        };

        return (
            <div>
                <RaisedButton label="Re-load" onClick={this.handleChange} style={style} />
                {TableTemplate}
            </div>
        );
    }
}

export default DataTableComponent;