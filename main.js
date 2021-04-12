let player1 = {
    player: 1,
    name: "player1",
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    hp: 100,
    weapon: ["weapon1, weapon2"],
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

function changeHp(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    const damageValue = Math.floor(Math.random() * DAMAGE_MAX_VALUE + DAMAGE_MIN_VALUE);
    const currentHp = player.hp - damageValue;
    if (currentHp < 0) {
        $randomButton.disabled = true;
        const winnerName = player.name === player1.name ? player2.name : player1.name;
        $arenas.appendChild(playerWin(winnerName));
    }
    player.hp = currentHp < 0 ? 0 : currentHp;
    $playerLife.style.width = player.hp + '%';
}

function playerWin(name) {
    const $winnerTitle = createElement('div', 'loseTitle');
    $winnerTitle.innerText = name + ' won!'
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
    changeHp(player1);
    changeHp(player2);
})
