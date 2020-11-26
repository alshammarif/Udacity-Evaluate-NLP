const apiGet = require('../../server/meaningCloudAPI');
const nlpPost = require('./post-builder/nlpViewPoster');
const checker = require('./inputCheckers');


//the submit button function that initiates the whole process
function handleSubmit(e) {
    e.preventDefault()

    let formText = document.getElementById('inputText').value;
    const ieChecker = checker.inputEmptyChecker(formText);

    if(ieChecker.boolean) {
        const input = checker.txtOrUrl(formText);
        apiGet.getApiData(input);
    } else if (ieChecker.error !== '') {
        nlpPost.errorMessage(ieChecker.error);
    }
    

    console.log("::: Form Submitted :::")
    
}



export { handleSubmit }
