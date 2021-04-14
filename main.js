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
    changeHp: changeHp,
    elHp: elHp,
    renderHp: renderHp,
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
    changeHp: changeHp,
    elHp: elHp,
    renderHp: renderHp,
    attack: function () {
        console.log(this.name + ' Fight...')
    }
};

const DAMAGE_MIN_VALUE = 1;
const DAMAGE_MAX_VALUE = 20;

const $randomButton = document.querySelector('.button');

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function getRandom() {
    return Math.floor(Math.random() * DAMAGE_MAX_VALUE + DAMAGE_MIN_VALUE);
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

const $arenas = document.querySelector('div.arenas');

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$randomButton.addEventListener('click', () => {
    player1.changeHp(getRandom());
    player1.renderHp();
    player2.changeHp(getRandom());
    player2.renderHp();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }
})
