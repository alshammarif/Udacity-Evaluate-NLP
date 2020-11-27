const tHeader = document.createElement('tr');
tHeader.className = 'hRow';

//Creates the header row
function headerRow(table) {
    thCreate('Level');
    thCreate('Text');
    thCreate('Score');
    thCreate('Agreement');
    thCreate('Confidence');

    table.appendChild(tHeader);

}

//Creates the new sentence or segment row based on the data passed 
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

//creates the column for the sentence or segment data
function tdCreate(classN, txt) {
    const column = document.createElement('td');
    column.className =  classN;
    column.innerText = txt;

    return column;
    
};

//Header row creation helper function. Creates the header columns
function thCreate(name) {
    const th = document.createElement('th');
    th.className = "colTitle";
    th.innerText = name;
    tHeader.appendChild(th);
}

export { rowlvl, tdCreate, thCreate, headerRow }