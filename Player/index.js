import {createElement} from "../utils";

class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.img = props.img;
        this.hp = props.hp;
        this.weapon = props.weapon;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    changeHp = (value) => {
        this.hp -= value;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    elHp = () => {
        return document.querySelector(`.${this.selector} .life`);
    }

    renderHp = () => {
        const $playerLife = this.elHp();
        $playerLife.style.width = this.hp + '%';
    }

    attack = () => {
        console.log(this.name + ' Fight...')
    }

    createPlayer = () => {
        const $player = createElement('div', this.selector);

        const $progressbar = createElement('div', 'progressbar');
        $player.appendChild($progressbar);

        const $life = createElement('div', 'life');
        $life.style.width = this.hp + '%';
        $progressbar.appendChild($life);

        const $name = createElement('div', 'name');
        $name.innerText = this.name;
        $progressbar.appendChild($name);

        const $character = createElement('div', 'character');
        $player.appendChild($character);

        const $img = createElement('img');
        $img.src = this.img;
        $character.appendChild($img);

        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);
        return $player;
    }
}

export default Player;