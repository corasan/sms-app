import React, {Component} from 'react'
import {Button, Modal, Input} from 'react-bootstrap'
import $ from 'jquery'

export default class NewMessage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            message: ''
        }
    }
    // Close modal
    close = () => {
        this.setState({ showModal: false });
    }
    // Open modal
    open = () => {
        this.setState({ showModal: true });
    }

    handleMessage = (e) => {
        this.setState({message: e.target.value})
    }

    sendMessage = () => {
        for(let i in this.props.contacts) {
            $.post('/contacts', {
                number: this.props.contacts[i].number,
                message: this.state.message
            });
        }
        this.close();
        this.setState({message: ''});
    }

    render() {
        return(
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.open}>
                    Nuevo mensaje +
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo mensaje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input type="textarea" label="Mensaje" value={this.state.message} onChange={this.handleMessage}/>
                        <p>Nota: Este mensaje sera enviado automaticamente a sus contactos.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button onClick={this.sendMessage}>Enviar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
