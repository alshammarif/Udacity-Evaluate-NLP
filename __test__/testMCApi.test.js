const jest = require('jest');
const apiCall = require('../src/server/meaningCloudAPI');

describe('Testing API Error Message functionality', () => {

    test('getAPIData is defined', () => {
        expect(apiCall.getApiData).toBeDefined();
    })

    test('Returns code "0" with sentence length 0 ', () => {
        //this is from links such as YouTube links being passed through. They are valid but do not have any content to show
        let checker = apiCall.checkCLMData('0',0);
        const output = JSON.stringify({boolean: false, error: 'This link does not contain any sentence data to show.'});
        
        expect(JSON.stringify(checker)).toBe(output);
    })

    test('Returns code that is NOT "0" from API', () => {
        //this error code is when it is not a URL with any data ex: www.gooddoggo.org
        let checker= apiCall.checkCodeisZero('212', 'No content to analyze');
        const output = JSON.stringify({ boolean:false, error: 'Status 212: No content to analyze.' });

        expect(JSON.stringify(checker)).toBe(output);
    })

})