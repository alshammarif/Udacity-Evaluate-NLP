const results = document.getElementById('results');
const NLPSec = document.getElementById('NLPSec');
const rowCreater = require('./rowCreationHelpers');

const nlpTable = document.createElement('table');
nlpTable.id= 'resTable';

//Creates the header row
rowCreater.headerRow(nlpTable);

//Compulates all the rows and adds them to a new table
async function createNLPPost(datas) {
    console.log(datas[1].segments);
    for(let i = 0; i < datas.length; i++) {
        let data = datas[i];
        let segs = data.segments;
        let senRow = rowCreater.rowlvl("Sentence", data);
        
        nlpTable.appendChild(senRow);

        for(let y = 0; y < segs.length; y++) {
            let seg = segs[y];
            let segRow = rowCreater.rowlvl("Segment", seg);
            
            nlpTable.appendChild(segRow);
        }
    }
    results.appendChild(nlpTable);
}

//Creates the error message box html element
function errorMessage(err) {
    const ehtml = document.createElement('div');
    ehtml.innerText = err;
    ehtml.id = 'apiError';

    NLPSec.appendChild(ehtml);
}

export { createNLPPost, errorMessage, nlpTable }