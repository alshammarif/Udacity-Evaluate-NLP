const apiKey = '8441a669b4a1b89a603a81a2fbac015e';
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const nlpPost = require('../client/js/post-builder/nlpViewPoster');

//Main API call function. Gets ALL the JSON data from the API based on the input provided
async function getApiData(input) {

        const req = await fetch(baseURL + apiKey + '&lang=auto' + '&ilang=en' + input);
        try {
            const langData = await req.json();
            const isCodeZero = checkCodeisZero(langData.status.code, langData.status.msg);

            if(isCodeZero.boolean) {
                const clmChecker= checkCLMData(langData.status.code, langData.sentence_list.length);
                
                if(clmChecker.boolean) {
                    const apiSentences = langData.sentence_list;
                    const sentences = getSentenceInfo(apiSentences);

                    return sentences;
                } else if(clmChecker.error !== '') {
                    nlpPost.errorMessage(clmChecker.error);
                }

            } else if(isCodeZero.error !== '') {
                nlpPost.errorMessage(isCodeZero.error);
            }

        } catch(err) {
            console.log(err);
        }
};

//Checker - sees if sentence length is greater than 0 when code is "0"
function checkCLMData(code, length) {
    if(code ==='0' && length === 0) {
        const noSentencesError = 'This link does not contain any sentence data to show.';
        return {boolean: false, error: noSentencesError};

    } else if(code === '0' && length > 0) {
        return {boolean: true, error: ''};
    }
}

//Checker - sees if API returns an 'error' status or an okay status by checking if status code is "0"
function checkCodeisZero(code, msg) {
    if (code !== '0') {
        const errormsg = `Status ${code}: ${msg}.`;
        return { boolean:false, error: errormsg };

    } else {
        return { boolean: true, error: ''};
    }
}

//Parses the sentence list and gets the basic infomation and creates a new list
async function getSentenceInfo(apiSentences) {
    let sentences = [];
    for(let i = 0; i < apiSentences.length; i++) {
        let sentence = apiSentences[i];
        let segments = getSegmentsInfo(sentence.segment_list);
        sentences.push({
            text: sentence.text,
            score_tag: sentence.score_tag,
            agreement: sentence.agreement,
            confidence: sentence.confidence,
            segments: segments
        });
    }

    postSenData('http://localhost:8081/NLPResults',sentences);
    getNLPData('http://localhost:8081/NLPResults');
    
    return sentences;
};

//Parses the sentence's segment list and also extracts basic info and returns a new list
function getSegmentsInfo(apiSegments) {
    let segments = [];
    for(let i = 0; i < apiSegments.length; i++) {
        let segment = apiSegments[i];
        segments.push({
            text: segment.text,
            score_tag: segment.score_tag,
            agreement: segment.agreement,
            confidence: segment.confidence
        })
    }
    return segments;
}

//Sends data to the server using a POST method
async function postSenData(url, sentences) {
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(sentences)
    })
    .then(res => res.json())
    .catch(err => err);
};

//Retrieves data from the server 
async function getNLPData(url) {
    const res = await fetch(url);
    try {
        const returnedData = await res.json();
        console.log(returnedData);
        nlpPost.createNLPPost(returnedData);

    } catch(error) {
        console.log(error);
    }
};

export { 
    getApiData, 
    getSentenceInfo, 
    getSegmentsInfo, 
    getNLPData, 
    postSenData, 
    apiKey, 
    baseURL, 
    checkCodeisZero, 
    checkCLMData }