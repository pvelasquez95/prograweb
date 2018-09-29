//import the necessary files
import React from 'react';
import { Modal, ControlLabel, FormGroup, FormControl, Button } from 'react-bootstrap';
//create a class for displaying the modal for adding a new game and export it
export class AddGame extends React.Component {
    constructor(props) {//create a state to handle the new game
        super(props);
        this.state = { name: "", platform: "", rate: "", photo: "" };
        this.handleGameNameChange = this.handleGameNameChange.bind(this);
        this.handleGamePlatformChange = this.handleGamePlatformChange.bind(this);
        this.handleGameRateChange = this.handleGameRateChange.bind(this);
        this.handleGamePhotoChange = this.handleGamePhotoChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleGameNameChange(e) {//change the name to reflect user input
        this.setState({ name: e.target.value });
    }
    handleGamePlatformChange(e) {//change the platform to reflect user input
        this.setState({ platform: e.target.value });
    }
    handleGameRateChange(e) {//change the rate to reflect user input
        this.setState({ rate: e.target.value });
    }
    handleGamePhotoChange(e) {//change the photo to reflect user input
        this.setState({ photo: e.target.value });
    }
    handleSubmit(e) {//get the game data, manipulate it and call the function for creating a new recipe
        e.preventDefault();
        const onAdd = this.props.onAdd;
        var newName = this.state.name;
        var newPlatform = this.state.platform;
        var newRate = this.state.rate;
        var newPhoto = this.state.photo;
        var newGame = { name: newName, platform: newPlatform, rate: newRate, photo: newPhoto };
        onAdd(newGame);
        this.setState({ name: "", platform: "", rate: "", photo: "" });
    }
    handleCancel() {
        const onAddModal = this.props.onAddModal;
        this.setState({ name: "", platform: "", rate: "", photo: "" });
        onAddModal();
    }
    render() {
        const onShow = this.props.onShow;
        var regex1 = /^\S/;
        const validGame = regex1.test(this.state.name) && regex1.test(this.state.platform)
            && regex1.test(this.state.rate) && regex1.test(this.state.photo);
        return (
            <div>
            <Modal show={onShow} onHide={this.handleCancel} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Game</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup controlId="formControlsName">
                            <ControlLabel>Game Name</ControlLabel>
                            <FormControl type="text" required onChange={this.handleGameNameChange} value={this.state.name} placeholder="Enter Name" />
                        </FormGroup>
                        <FormGroup controlId="formControlsPlatform">
                            <ControlLabel>Game Platform</ControlLabel>
                            <FormControl type="text" required onChange={this.handleGamePlatformChange} value={this.state.platform} placeholder="Enter Platform" />
                        </FormGroup>
                        <FormGroup controlId="formControlsRate">
                            <ControlLabel>Game Rate</ControlLabel>
                            <FormControl type="text" required onChange={this.handleGameRateChange} value={this.state.rate} placeholder="Enter Rate" />
                        </FormGroup>
                        <FormGroup controlId="formControlsPhoto">
                            <ControlLabel>Game Photo</ControlLabel>
                            <FormControl type="text" required onChange={this.handleGamePhotoChange} value={this.state.photo} placeholder="Enter Photo" />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={!validGame} bsStyle="success" onClick={this.handleSubmit}>Save Game</Button>
                    </Modal.Footer>
            </Modal>
            </div>
        );
    }
};
