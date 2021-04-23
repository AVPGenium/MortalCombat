class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.img = props.img;
        this.hp = props.hp;
        this.weapon = props.weapon;
    }

    changeHp = (value) => {
        this.hp -= value;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    elHp = () => {
        return document.querySelector('.player' + this.player + ' .life');
    }

    renderHp = () => {
        const $playerLife = this.elHp();
        $playerLife.style.width = this.hp + '%';
    }

    attack = () => {
        console.log(this.name + ' Fight...')
    }
}

export let player1 = new Player({
    player: 1,
    name: "player1",
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    hp: 100,
    weapon: ["weapon1, weapon2"]
});

export let player2 = new Player({
    player: 2,
    name: "player2",
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    hp: 100,
    weapon: ["weapon1, weapon2"]
});