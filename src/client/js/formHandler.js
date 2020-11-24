//import { getAPIData } from '../../mcApi.js';
const apiGet = require('../../server/meaningCloudAPI');
//import {createNLPPost } from '../js/nlpViewPoster.js';
const nlpPost = require('./nlpViewPoster');
const validURLChecker = require('../../validURL')

function handleSubmit(e) {
    e.preventDefault()

    let formText = document.getElementById('inputText').value;
    const ieChecker = inputEmptyChecker(formText);

    if(ieChecker.boolean) {
        const input = txtOrUrl(formText);
        apiGet.getApiData(input);
    } else if (ieChecker.error !== '') {
        nlpPost.errorMessage(ieChecker.error);
    }
    

    console.log("::: Form Submitted :::")
    
}

function inputEmptyChecker(input) {
    if(input === '') {
        const noText = 'Please input some text or a valid URL in the text area.';
        return {boolean: false, error: noText};

    } else {
        return {boolean: true, error: ''};
    }
}

function txtOrUrl(input) {
    if(validURLChecker.validURL(input)) {
        return '&url=' + input;
    } else {
        return '&txt=' + input;
    }
}

export { handleSubmit, txtOrUrl, inputEmptyChecker }
