//import the necessary files
import React from 'react';
import { Modal, ControlLabel, FormGroup, FormControl, Button } from 'react-bootstrap';
//create a class for displaying the modal for editing an existing game and export it
export class EditGame extends React.Component {
    constructor(props) {//create a state to handle the game to be edited
        super(props);
        this.state = { name: "", platform: "", rate: "", photo: "" };
        this.handleGameNameChange = this.handleGameNameChange.bind(this);
        this.handleGamePlatformChange = this.handleGamePlatformChange.bind(this);
        this.handleGameRateChange = this.handleGameRateChange.bind(this);
        this.handleGamePhotoChange = this.handleGamePhotoChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    static getDerivedStateFromProps(props, state) {//make the game prop a state
        const prevName = state.prevName;
        const prevPlatform = state.prevPlatform;
        const prevRate = state.prevRate;
        const prevPhoto = state.prevPhoto;
        const name = prevName !== props.game.name ? props.game.name : state.name;
        const platform = prevPlatform !== props.game.platform ? props.game.platform : state.platform;
        const rate = prevRate !== props.game.rate ? props.game.rate : state.rate;
        const photo = prevPhoto !== props.game.photo ? props.game.photo : state.photo;
        return {
            prevName: props.game.name, name,
            prevPlatform: props.game.platform, platform,
            prevRate: props.game.rate, rate,
            prevPhoto: props.game.photo, photo,
        }
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
    handleEdit(e) {//get the game data, manipulate it and call the function for editing an existing game
        e.preventDefault();
        const onEdit = this.props.onEdit;
        const currentlyEditing = this.props.currentlyEditing;
        var name = this.state.name;
        var platform = this.state.platform;
        var rate = this.state.rate;
        var photo = this.state.photo;
        onEdit(name, platform, rate, photo, currentlyEditing);
    }
    handleCancel() {
        const onEditModal = this.props.onEditModal;
        this.setState({
            name: this.props.game.name, platform: this.props.game.platform,
            rate: this.props.game.rate, photo: this.props.game.photo
        });
        onEditModal();
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
                        <Modal.Title>Edit Game</Modal.Title>
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
                        <Button disabled={!validGame} bsStyle="success" onClick={this.handleEdit}>Save Recipe</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};