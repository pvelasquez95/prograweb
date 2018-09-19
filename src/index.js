import React from 'react';
import ReactDOM from 'react-dom';
import { PanelGroup, Panel, Button, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap';
import { CardGroup, CardBody, CardTitle, CardImage, Card } from 'reactstrap';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [
                { name: "Dota 2", platform: ["PC"], rate: ["7"], img:['https://res.cloudinary.com/teepublic/image/private/s--ZN1OWoLD--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1489237320/production/designs/1310293_1.jpg'] },
                { name: "Mario Odyssey", platform: ["NS"], rate: ["9.5"], img:['https://res.cloudinary.com/teepublic/image/private/s--ZN1OWoLD--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1489237320/production/designs/1310293_1.jpg'] },
                { name: "Zelda Breath of the Wild", platform: ["NS"], rate: ["9"] , img:['https://res.cloudinary.com/teepublic/image/private/s--ZN1OWoLD--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1489237320/production/designs/1310293_1.jpg']},
                { name: "Sea of Thieves", platform: ["XBOX"], rate: ["5"], img:['https://res.cloudinary.com/teepublic/image/private/s--ZN1OWoLD--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1489237320/production/designs/1310293_1.jpg'] },
                { name: "State of Decay 2", platform: ["XBOX"], rate: ["4"], img:['https://res.cloudinary.com/teepublic/image/private/s--ZN1OWoLD--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1489237320/production/designs/1310293_1.jpg'] },
                { name: "Overwatch", platform: ["PC"], rate: ["7.5"], img:['https://res.cloudinary.com/teepublic/image/private/s--ZN1OWoLD--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1489237320/production/designs/1310293_1.jpg'] },
                { name: "Persona 5", platform: ["PS4"], rate: ["8.5"], img:['https://res.cloudinary.com/teepublic/image/private/s--ZN1OWoLD--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1489237320/production/designs/1310293_1.jpg'] },
                { name: "Digimon Cyber Sleuth", platform: ["PS4"], rate: ["8"], img:['https://res.cloudinary.com/teepublic/image/private/s--ZN1OWoLD--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1489237320/production/designs/1310293_1.jpg'] },
            ]
        };
    }
    render() {
        const games = this.state.games;
        return (
            <div className="jumbotron">
                <h1>All the videogames I've loved</h1>
                <div id="games">
                    {games.map((game, index) => (
                        <Card key={index} className="col-md-6">
                        {game.platform.map((img, index) => (
                                            <CardImage top src={index}>{img} overlay="white-slight" hover waves alt="Card image cap"/>
                                            </CardImage>  
                                        ))}
                            
                            <CardBody>
                                <CardTitle className="title">{game.name}</CardTitle>
                                    <ListGroup>
                                        {game.platform.map((platform, index) => (
                                            <ListGroupItem key={index}>{platform}</ListGroupItem>
                                        ))}
                                    </ListGroup>
                                    <ListGroup>
                                        {game.rate.map((rate, index) => (
                                            <ListGroupItem key={index}>{rate}</ListGroupItem>
                                        ))}
                                    </ListGroup>
                                    <ButtonToolbar>
                                        <Button bsStyle="warning">Edit</Button>
                                        <Button bsStyle="danger">Delete</Button>
                                    </ButtonToolbar>
                                
                            </CardBody>
                            
                        </Card>
                    ))}
                </div>
                <Button bsStyle="primary">Add Game</Button>
            </div>
        );
    }
};
ReactDOM.render(<Games />, document.getElementById('app'));
registerServiceWorker();
