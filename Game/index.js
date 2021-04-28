import {generateLogs} from "../logger/logger";

export default class Game {
    constructor(player1, player2, props) {
        this.player1 = player1;
        this.player2 = player2;
        this.rootSelector = props.rootSelector;
    }

    start = () => {
        this.player1.createPlayer();
        this.player2.createPlayer();

        const $formFight = document.querySelector('.control');
        $formFight.addEventListener('submit',  (event) => {
            event.preventDefault();

            const {hit, defence} = this.playerAttack($formFight);

            const {player1: player, player2: enemy} = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                method: 'POST',
                body: JSON.stringify({
                    hit,
                    defence
                })
            });

            this.performAttack(this.player2, player, enemy);
            this.performAttack(this.player1, enemy, player);

            this.showResult();
        })

        generateLogs('start', this.player1, this.player2);
    }

    playerAttack = ($formFight) => {
        const attack = {};

        for(let item of $formFight) {
            if (item.checked && item.name === 'hit') {
                attack.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
            item.checked = false;
        }

        return attack;
    }

    performAttack = (target, attack, defence) => {
        if (defence.defence !== attack.hit) {
            target.changeHp(attack.value);
            target.renderHp();
            generateLogs('hit', target, target.player === 1 ? this.player2 : this.player1, attack.value);
        } else {
            generateLogs('defence', target, target.player === 1 ? this.player2 : this.player1);
        }
    }

    playerWins = (name) => {
        const $winnerTitle = createElement('div', 'loseTitle');
        if (name) {
            $winnerTitle.innerText = name + ' wins!'
        } else {
            $winnerTitle.innerText = 'draw'
        }
        return $winnerTitle;
    }

    createReloadButton = () => {
        const $reloadButtonDiv = createElement('div', 'reloadWrap');
        const $reloadButton = createElement('button', 'button');
        $reloadButton.innerText = 'Reload';

        $reloadButton.addEventListener('click', function () {
            //window.location.reload();
            window.location.pathname = 'index.html';
        });

        $reloadButtonDiv.appendChild($reloadButton);
        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($reloadButtonDiv);
    }

    showResult = () => {
        if (this.player1.hp === 0 || this.player2.hp === 0) {
            this.createReloadButton();
        }

        const $root = document.querySelector(`.${this.rootSelector}`);
        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
            $root.appendChild(this.playerWins(this.player2.name));
            generateLogs('end', this.player2, this.player1);
        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
            $root.appendChild(this.playerWins(this.player1.name));
            generateLogs('end', this.player1, this.player2);
        } else if (this.player1.hp === 0 && this.player2.hp === 0) {
            $root.appendChild(this.playerWins());
            generateLogs('draw');
        }
    }
}