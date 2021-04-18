const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

const $chat = document.querySelector('.chat');

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

function generateLogs(type, player1, player2, hpChange) {
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
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        case 'defence':
            text = text
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            el = `<p>${date} ${text} ${player1.hp}/100</p>`
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        case 'hit':
            text = text
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            el = `<p>${date} ${text} -${hpChange}hp ${player1.hp}/100</p>`
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        case 'end':
            text = text
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
            el = `<p>${text}</p>`
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        case 'draw':
            el = `<p>${text}</p>`
            $chat.insertAdjacentHTML('afterbegin', el);
            break;
        default:
            break;
    }

}

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
    const hit = ATTACK[getRandom(ATTACK.length) - 1];
    const defence = ATTACK[getRandom(ATTACK.length) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function playerAttack() {
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

function performAttack(target, attack, defence) {
    if (defence.defence !== attack.hit) {
        target.changeHp(attack.value);
        target.renderHp();
        generateLogs('hit', target, target.player === 1 ? player2 : player1, attack.value);
    } else {
        generateLogs('defence', target, target.player === 1 ? player2 : player1);
    }
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

$formFight.addEventListener('submit', function (event) {
    event.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    performAttack(player2, player, enemy);
    performAttack(player1, enemy, player);

    showResult();
})

generateLogs('start', player1, player2);
