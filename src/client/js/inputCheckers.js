const validURLChecker = require('../../validURL')

//Checks if input from the form is empty or has some written input
function inputEmptyChecker(input) {
    if(input === '') {
        const noText = 'Please input some text or a valid URL in the text area.';
        return {boolean: false, error: noText};

    } else {
        return {boolean: true, error: ''};
    }
}

//If input is not empty it checks if the input is a URL or not. (any thing that is not a URL is considered a text)
function txtOrUrl(input) {
    if(validURLChecker.validURL(input)) {
        return '&url=' + input;
    } else {
        return '&txt=' + input;
    }
}

export {
    inputEmptyChecker,
    txtOrUrl
}