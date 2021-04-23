const getRandom = function (maxValue, minValue = 1) {
    return Math.floor(Math.random() * maxValue + minValue);
}

export default getRandom;