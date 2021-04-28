import Game from './Game';
import Player from "./Player";

const player1 = new Player(JSON.parse(localStorage.getItem('player1')));
const player2 = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
    .then(res => res.json());

const game = new Game(player1. player2);
game.start();
