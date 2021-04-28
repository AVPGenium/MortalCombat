import {getRandom} from "../utils";
import {logs} from "../constants";

const $chat = document.querySelector('.chat');

export function generateLogs(type, player1, player2, hpChange) {
    let text = logs[type][getRandom(logs[type].length)-1];
    let el;
    const date = new Date();
    switch (type) {
        case 'start':
            text = text
                .replace('time', date)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
            el = `<p>${text}</p>`
            break;
        case 'defence':
            text = text
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            el = `<p>${date} ${text} ${player1.hp}/100</p>`
            break;
        case 'hit':
            text = text
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            el = `<p>${date} ${text} -${hpChange}hp ${player1.hp}/100</p>`
            break;
        case 'end':
            text = text
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
            el = `<p>${text}</p>`
            break;
        case 'draw':
            el = `<p>${text}</p>`
            break;
        default:
            break;
    }

    $chat.insertAdjacentHTML('afterbegin', el);
}