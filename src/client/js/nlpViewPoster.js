const results = document.getElementById('results');
const NLPSec = document.getElementById('NLPSec');


const nlpTable = document.createElement('table');
nlpTable.id= 'resTable';
const tHeader = document.createElement('tr');
tHeader.className = 'hRow';
thCreate('Level');
thCreate('Text');
thCreate('Score');
thCreate('Agreement');
thCreate('Confidence');
nlpTable.appendChild(tHeader);

async function createNLPPost(datas) {
    //console.log(datas);
    console.log(datas[1].segments);
    for(let i = 0; i < datas.length; i++) {
        let data = datas[i];
        let segs = data.segments;
        let senRow = rowlvl("Sentence", data);
        
        nlpTable.appendChild(senRow);

        for(let y = 0; y < segs.length; y++) {
            let seg = segs[y];
            let segRow = rowlvl("Segment", seg);
            
            nlpTable.appendChild(segRow);
        }
    }
    results.appendChild(nlpTable);
}

function rowlvl(level, lvlData) {
    console.log(lvlData);
    const row = document.createElement('tr');
    row.className = "dRow";

    row.appendChild(tdCreate('lvlcol', level));
    row.appendChild(tdCreate('clCol', lvlData.text));
    row.appendChild(tdCreate('scCol', lvlData.score_tag));
    row.appendChild(tdCreate('agCol', lvlData.agreement));
    row.appendChild(tdCreate('conCol', lvlData.confidence));
    
    return row;
}

function tdCreate(classN, txt) {
    const column = document.createElement('td');
    column.className =  classN;
    column.innerText = txt;

    return column;
    
};

function thCreate(name) {
    const th = document.createElement('th');
    th.className = "colTitle";
    th.innerText = name;
    tHeader.appendChild(th);
}

function errorMessage(err) {
    const ehtml = document.createElement('div');
    ehtml.innerText = err;
    ehtml.id = 'apiError';

    NLPSec.appendChild(ehtml);
}

export { createNLPPost, rowlvl, thCreate, tdCreate, errorMessage, NLPSec }