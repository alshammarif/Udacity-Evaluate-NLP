const path = require('path');
const express = require('express');

//Express server set up
const app = express()

app.use(express.static('dist'))

//Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

console.log(__dirname)

//GET and POST functionality
let data = [];

app.get('/NLPResults', (req, res) => {
    res.json(data);
})

app.post('/NLPResults', (req, res) => {
    let rbody = req.body;
    for(let i=0; i < rbody.length; i++) {
        let sentence = rbody[i];
        console.log(sentence.segments);
        data.push(sentence);
    }
    res.json(data);
})

//Designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})




