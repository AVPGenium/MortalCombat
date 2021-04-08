let player1 = {
    name: "player1",
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    hp: 100,
    weapon: ["weapon1, weapon2"],
    attack: function () {
        console.log(this.name + ' Fight...')
    }
};

let player2 = {
    name: "player2",
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    hp: 60,
    weapon: ["weapon1, weapon2"],
    attack: function () {
        console.log(this.name + ' Fight...')
    }
};

function createPlayer(playerStyleClass, player) {
    const $player = document.createElement('div');
    $player.className = playerStyleClass;

    const $progressbar = document.createElement('div');
    $progressbar.className = 'progressbar';
    $player.appendChild($progressbar);

    const $life = document.createElement('div');
    $life.style.width = player.hp + '%';
    $life.className = 'life';
    const $name = document.createElement('div');
    $name.className = 'name';
    $name.innerText = player.name;
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    const $character = document.createElement('div');
    $character.className = 'character';
    $player.appendChild($character);

    const $img = document.createElement('img');
    $img.src = player.img;
    $character.appendChild($img);

    const $arenas = document.querySelector('div.arenas');
    $arenas.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
