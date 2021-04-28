export const getRandom = function (maxValue, minValue = 1) {
    return Math.floor(Math.random() * maxValue + minValue);
}

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export const getTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
}