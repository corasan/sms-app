import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

export default class MessagesList extends Component{
    message() {
        const arr = [];
        let counter = 1;
        for(let i in this.props.messages) {
            arr.push(
                <tr key={counter}>
                    <td>{counter++}</td>
                    <td>{this.props.messages[i].message}</td>
                </tr>
            )
        }
        return arr;
    }
    render() {
        return(
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mensaje</th>
                    </tr>
                </thead>
                <tbody>
                    {this.message()}
                </tbody>
            </Table>
        )
    }
}
