import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonToolbar, ListGroupItem } from 'react-bootstrap';
import { CardBody, CardTitle, Card, CardText } from 'reactstrap';
import { ImageHeader } from "react-simple-card";
import { AddGame } from './components/addgame';
import { EditGame } from './components/editgame';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            showAdd: false,
            showEdit: false,
            currentlyEditing: 0
        };
        this.showAddModal = this.showAddModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.addGame = this.addGame.bind(this);
        this.editGame = this.editGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
    }
    componentDidMount() {//load the local storage data after the component renders
        var games = (typeof localStorage["games"] !== "undefined") ? JSON.parse(localStorage.getItem("games")) : [
            { name: "Dota 2", platform: ["PC"], rate: ["7"], photo: ['https://files.sirclocdn.xyz/kudouanimanga/products/_170803170241_21%20dota2_tn.jpg'] },
            { name: "Mario Odyssey", platform: ["NS"], rate: ["9.5"], photo: ['https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Super_Mario_Odyssey.jpg/220px-Super_Mario_Odyssey.jpg'] },
            { name: "Zelda Breath of the Wild", platform: ["NS"], rate: ["9"], photo: ['https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/220px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg'] },
            { name: "Sea of Thieves", platform: ["XBOX"], rate: ["5"], photo: ['https://store-images.s-microsoft.com/image/apps.47844.14554784103656548.c603f1f6-32b9-41dc-8f67-41374fe8b6db.e1b20439-8be8-46e6-890a-f05a6cae6d1c?mode=crop&q=90&h=300&w=200'] },
            { name: "State of Decay 2", platform: ["XBOX"], rate: ["4"], photo: ['https://i11d.3djuegos.com/juegos/13406/state_of_decay_2/fotos/ficha/state_of_decay_2-3753095.jpg'] },
            { name: "Overwatch", platform: ["PC"], rate: ["7.5"], photo: ['https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Overwatch_cover_art.jpg/220px-Overwatch_cover_art.jpg'] },
            { name: "Persona 5", platform: ["PS4"], rate: ["8.5"], photo: ['https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Persona_5_cover_art.jpg/220px-Persona_5_cover_art.jpg'] },
            { name: "Digimon Cyber Sleuth", platform: ["PS4"], rate: ["8"], photo: ['https://k61.kn3.net/taringa/4/7/2/3/7/3//gonza491/330x330_0BB.jpg'] }
        ];
        this.setState({ games: games });
    }
    showAddModal() {
        this.setState({ showAdd: !this.state.showAdd });
    }
    showEditModal(index) {
        this.setState({ showEdit: !this.state.showEdit, currentlyEditing: index });
    }
    addGame(game) {
        let games = this.state.games;
        games.push(game);
        localStorage.setItem('games', JSON.stringify(games));
        this.setState({ games: games });
        this.showAddModal();
    }
    editGame(newName, newPlatform, newRate, newPhoto, currentlyEditing) {//edit an existing recipe
        let games = this.state.games;
        games[currentlyEditing] = { name: newName, platform: newPlatform, rate: newRate, photo: newPhoto };
        localStorage.setItem('games', JSON.stringify(games));
        this.setState({ games: games });
        this.showEditModal(currentlyEditing);
    }
    deleteGame(index) {//delete an existing game
        let games = this.state.games.slice();
        games.splice(index, 1);
        localStorage.setItem('games', JSON.stringify(games));
        this.setState({ games: games, currentlyEditing: 0 });
    }
    render() {
        const games = this.state.games;
        return (
            <div className="jumbotron">
                <h1>All the videogames I've loved</h1>
                <div id="games">
                    {games.map((game, index) => (
                        <Card key={index} className="col-md-6">
                            <CardBody>
                                <CardTitle className="title">{game.name}</CardTitle>
                                <ImageHeader imageSrc={game.photo} />
                                <CardText>
                                    <ListGroupItem> {game.platform}</ListGroupItem>
                                    <ListGroupItem> {game.rate}</ListGroupItem>
                                </CardText>
                                <ButtonToolbar>
                                    <Button bsStyle="warning" onClick={() => { this.showEditModal(index) }}>Edit</Button>
                                    <Button bsStyle="danger" onClick={() => { this.deleteGame(index) }}>Delete</Button>
                                </ButtonToolbar>
                                <EditGame onShow={this.state.showEdit} onEdit={this.editGame}
                                    onEditModal={() => { this.showEditModal(this.state.currentlyEditing) }}
                                    currentlyEditing={this.state.currentlyEditing}
                                    game={games[this.state.currentlyEditing]} />

                            </CardBody>

                        </Card>
                    ))}
                </div>
                <Button bsStyle="primary" onClick={this.showAddModal}>Add Game</Button>
                <AddGame onShow={this.state.showAdd} onAdd={this.addGame} onAddModal={this.showAddModal} />

            </div>
        );
    }
};
ReactDOM.render(<Games />, document.getElementById('app'));
registerServiceWorker();
