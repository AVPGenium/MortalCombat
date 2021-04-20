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

export let player1 = {
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

export let player2 = {
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