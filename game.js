import {enemyAttack, performAttack, playerAttack} from "./logic";
import {player1, player2} from "./player";
import {generateLogs} from "./logger";

export  default class Game {
    start = () => {
        const $arenas = document.querySelector('div.arenas');
        $arenas.appendChild(this.createPlayer(player1));
        $arenas.appendChild(this.createPlayer(player2));

        const $formFight = document.querySelector('.control');
        $formFight.addEventListener('submit',  (event) => {
            event.preventDefault();
            const enemy = enemyAttack();
            const player = playerAttack($formFight);

            performAttack(player2, player, enemy);
            performAttack(player1, enemy, player);

            this.showResult();
        })

        generateLogs('start', player1, player2);
    }

    createElement = (tag, className) => {
        const $tag = document.createElement(tag);
        if(className) {
            $tag.classList.add(className);
        }
        return $tag;
    }

    playerWins = (name) => {
        const $winnerTitle = this.createElement('div', 'loseTitle');
        if (name) {
            $winnerTitle.innerText = name + ' wins!'
        } else {
            $winnerTitle.innerText = 'draw'
        }
        return $winnerTitle;
    }

    createPlayer = ({player, hp, name, img}) => {
        const playerStyleClass = 'player' + player;
        const $player = this.createElement('div', playerStyleClass);

        const $progressbar = this.createElement('div', 'progressbar');
        $player.appendChild($progressbar);

        const $life = this.createElement('div', 'life');
        $life.style.width = hp + '%';
        $progressbar.appendChild($life);

        const $name = this.createElement('div', 'name');
        $name.innerText = name;
        $progressbar.appendChild($name);

        const $character = this.createElement('div', 'character');
        $player.appendChild($character);

        const $img = this.createElement('img');
        $img.src = img;
        $character.appendChild($img);

        return $player;
    }

    createReloadButton = () => {
        const $reloadButtonDiv = this.createElement('div', 'reloadWrap');
        const $reloadButton = this.createElement('button', 'button');
        $reloadButton.innerText = 'Reload';

        $reloadButton.addEventListener('click', function () {
            window.location.reload();
        });

        $reloadButtonDiv.appendChild($reloadButton);
        $arenas.appendChild($reloadButtonDiv);
    }

    showResult = () => {
        if (player1.hp === 0 || player2.hp === 0) {
            this.createReloadButton();
        }

        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arenas.appendChild(this.playerWins(player2.name));
            generateLogs('end', player2, player1);
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            $arenas.appendChild(this.playerWins(player1.name));
            generateLogs('end', player1, player2);
        } else if (player1.hp === 0 && player2.hp === 0) {
            $arenas.appendChild(this.playerWins());
            generateLogs('draw');
        }
    }
}