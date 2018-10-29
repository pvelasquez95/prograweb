import React from 'react';
import ReactDOM from 'react-dom';
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
        const url = 'http://localhost:3001/api/juegos/';
        fetch(url,{method: 'GET'})
        .then(res => res.json())
        .then(json => {
            console.log('primero');
            console.log(json);
            console.log('primero fin');
            this.setState({ games: json});
        })/*
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
        this.setState({ games: games });*/
        
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
        const juegos2 = this.state.games;

        const games = Array.from(Object.keys(juegos2), x=>juegos2[x]) ;
        console.log('inicio')
        console.log(games)
        console.log('fin')
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="neon">All the videogames I've loved</div>
                    <div className="flux">♥ ♥ ♥ ♥ ♥</div>
                </div>

                <div className="text-center">
                    <button type="button" className="btn btn-labeled btn-primary btn-letra" onClick={this.showAddModal}>
                        <span className="btn-label"><i className="glyphicon glyphicon-plus"></i></span>   Add Game   </button>
                    <br />
                </div>
                <AddGame onShow={this.state.showAdd} onAdd={this.addGame} onAddModal={this.showAddModal} />
                <div className="text-center">
                    <div id="games" className="row mt-30">
                    

                        {games.map((game, index) => (
                            <div className="col-md-4 col-sm-6" key={index}>
                                <div className="box16" >
                                    <ImageHeader imageSrc={game.photo} />
                                    <div className="box-content">
                                        <ul className="social">
                                            <h3 className="title">{game.name}</h3>
                                            <span className="post">Plataform: {game.platform}</span>
                                            <br />
                                            <span className="post">Rate: {game.rate}</span>
                                            <br />
                                            <button type="button" className="btn btn-labeled btn-warning btn-letra" onClick={() => { this.showEditModal(index) }}>
                                                <span className="btn-label"><i className="glyphicon glyphicon-pencil"></i></span>   Edit   </button>
                                            <br />
                                            <button type="button" className="btn btn-labeled btn-danger btn-letra" onClick={() => { this.deleteGame(index) }}>
                                                <span className="btn-label"><i className="glyphicon glyphicon-trash"></i></span>   Delete   </button>

                                            <EditGame onShow={this.state.showEdit} onEdit={this.editGame}
                                                onEditModal={() => { this.showEditModal(this.state.currentlyEditing) }}
                                                currentlyEditing={this.state.currentlyEditing}
                                                game={games[this.state.currentlyEditing]} />
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        );
    }
};
ReactDOM.render(<Games />, document.getElementById('app'));
registerServiceWorker();
