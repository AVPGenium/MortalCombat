import {generateLogs} from "./logger";
import {enemyAttack, performAttack, playerAttack} from "./logic";
import {player1, player2} from "./player";

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function playerWins(name) {
    const $winnerTitle = createElement('div', 'loseTitle');
    if (name) {
        $winnerTitle.innerText = name + ' wins!'
    } else {
        $winnerTitle.innerText = 'draw'
    }
    return $winnerTitle;
}

function createPlayer({player, hp, name, img}) {
    const playerStyleClass = 'player' + player;
    const $player = createElement('div', playerStyleClass);

    const $progressbar = createElement('div', 'progressbar');
    $player.appendChild($progressbar);

    const $life = createElement('div', 'life');
    $life.style.width = hp + '%';
    $progressbar.appendChild($life);

    const $name = createElement('div', 'name');
    $name.innerText = name;
    $progressbar.appendChild($name);

    const $character = createElement('div', 'character');
    $player.appendChild($character);

    const $img = createElement('img');
    $img.src = img;
    $character.appendChild($img);

    return $player;
}

const $arenas = document.querySelector('div.arenas');
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function createReloadButton() {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Reload';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}

function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    }
}

const $formFight = document.querySelector('.control');
$formFight.addEventListener('submit',  (event) => {
    event.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack($formFight);

    performAttack(player2, player, enemy);
    performAttack(player1, enemy, player);

    showResult();
})

generateLogs('start', player1, player2);
