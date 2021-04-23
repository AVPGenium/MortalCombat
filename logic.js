import getRandom from "./utils";
import {player1, player2} from "./player";

const HIT = {
    head: 30,
    body: 20,
    foot: 10
}

const ATTACK = ['head', 'body', 'foot'];

export function enemyAttack() {
    const hit = ATTACK[getRandom(ATTACK.length) - 1];
    const defence = ATTACK[getRandom(ATTACK.length) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

export function playerAttack($formFight) {
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

    return attack;
}

export function performAttack(target, attack, defence) {
    if (defence.defence !== attack.hit) {
        target.changeHp(attack.value);
        target.renderHp();
        generateLogs('hit', target, target.player === 1 ? player2 : player1, attack.value);
    } else {
        generateLogs('defence', target, target.player === 1 ? player2 : player1);
    }
}