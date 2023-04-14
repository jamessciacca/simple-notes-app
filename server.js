//importing all needed modules
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const fs = require('fs');

//pulling in the unique id module
const noteId = require('generate-unique-id');

//creating a new instance of the express object
const app = express();

//creating a notesd object to hold the json object
const notes = require('./db/db.json')

//creating middleware instances
//tells the server that the public file is the root
app.use(express.static('public'));
//parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());
//parse the incoming request with urlencoded payloads and is based upon the body-parser
app.use(express.urlencoded({extended: true}));

//creating the root path that return the homescreen to the user upon visiting the site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

//creating the /notes path to allow the users to see the notes/html file when the button is clicked
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

//creating the /api/notes path to allow the user to see the notes that are saved and added to the json file
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

//creating a post to show/add notes to the screen
//this post is recieved by a fetch in the index.js file!
app.post('/api/notes', (req, res) => {
    req.body.id = noteId();
    //pushing the note to the array
    notes.push(req.body);
    //syncing file with new note
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));
    res.json(notes);
});

//creating a listener to know wehen theserver is running
app.listen(PORT, () => console.log('Listening on port %s', PORT));