import React from 'react';
import ReactDOM from 'react-dom';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
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
          {name: "Dota 2", platform: ["PC"], rate: ["7"]},
          {name: "Mario Odyssey", platform: ["NS"], rate: ["9.5"]},
          {name: "Zelda Breath of the Wild", platform: ["NS"], rate: ["9"]},
          {name: "Sea of Thieves", platform: ["XBOX"], rate: ["5"]},
          {name: "State of Decay 2", platform: ["XBOX"], rate: ["4"]},
          {name: "Overwatch", platform: ["PC"], rate: ["7.5"]},
          {name: "Persona 5", platform: ["PS4"], rate: ["8.5"]},
          {name: "Digimon Cyber Sleuth", platform: ["PS4"], rate: ["8"]},
        ]
      };
    }
    render() {
        const games = this.state.games;
        return(
          <div className="jumbotron">
            <h1>Some of my loved videogames</h1>
            <PanelGroup accordion id="games">
              {games.map((game, index) => (
                <Panel eventKey={index} key={index}>
                  <Panel.Heading>
                    <Panel.Title className="title" toggle>{game.name}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
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
                  </Panel.Body>
                </Panel>
              ))}
            </PanelGroup>
            <Button bsStyle="primary">Add Game</Button>
          </div>
        );
      }
    };
ReactDOM.render(<Games />, document.getElementById('app'));
registerServiceWorker();
