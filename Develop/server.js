const express = require('express');
const path = require('path');
const database = require('./db/db.json');
const fs = require('fs');
const { json } = require('express');
const {v4:uuidv4} = require('uuid')

const PORT = 9001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });


  app.get('/api/notes', (req, res) => res.json(database));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
  });

  app.post('/api/notes', async(req, res) => {
    const notes = await fs.promises.readFile('./db/db.json', 'utf8')
    const notesArray = JSON.parse(notes)
    const newNote = req.body
    const newId = uuidv4()
    newNote[0].id = newId
    notesArray.push(newNote)
    const notesArrayString = JSON.stringify(notesArray)
    await fs.promises.writeFile('./db/db.json', notesArrayString)
    res.send(newNote)
  });


app.listen(PORT, ()=> console.log(
  `listening on ${PORT}`
))