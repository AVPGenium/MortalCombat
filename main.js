function changeHp(value) {
    this.hp -= value;
    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHp() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHp() {
    const $playerLife = this.elHp();
    $playerLife.style.width = this.hp + '%';
}

let player1 = {
    player: 1,
    name: "player1",
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    hp: 100,
    weapon: ["weapon1, weapon2"],
    changeHp,
    elHp,
    renderHp,
    attack: function () {
        console.log(this.name + ' Fight...')
    }
};

let player2 = {
    player: 2,
    name: "player2",
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    hp: 100,
    weapon: ["weapon1, weapon2"],
    changeHp,
    elHp,
    renderHp,
    attack: function () {
        console.log(this.name + ' Fight...')
    }
};



// const $randomButton = document.querySelector('.button');

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function getRandom(maxValue, minValue = 1) {
    return Math.floor(Math.random() * maxValue + minValue);
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

function createPlayer(player) {
    const playerStyleClass = 'player' + player.player;
    const $player = createElement('div', playerStyleClass);

    const $progressbar = createElement('div', 'progressbar');
    $player.appendChild($progressbar);

    const $life = createElement('div', 'life');
    $life.style.width = player.hp + '%';
    $progressbar.appendChild($life);

    const $name = createElement('div', 'name');
    $name.innerText = player.name;
    $progressbar.appendChild($name);

    const $character = createElement('div', 'character');
    $player.appendChild($character);

    const $img = createElement('img');
    $img.src = player.img;
    $character.appendChild($img);

    return $player;
}

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 20,
    foot: 10
}
const ATTACK = ['head', 'body', 'foot'];

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

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function performAttack(target, attack, defence) {
    if (defence.defence !== attack.hit) {
        target.changeHp(getRandom(attack.value));
        target.renderHp();
    }
}

$formFight.addEventListener('submit', function (event) {
    event.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

    for(let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    performAttack(player2, attack, enemy);
    performAttack(player1, enemy, attack);

    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }
})
