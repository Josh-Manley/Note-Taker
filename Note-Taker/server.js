const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001
const fs = require('fs');
const noteData = require('./db/db.json');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  const jsonData = fs.readFileSync(path.join(__dirname, './db/db.json'));
  const notes = JSON.parse(jsonData);
  res.json(notes)
})

app.post('/api/notes', (req, res) => {
  const {title, text} = req.body;
  const newNote = {
      title,
      text,
      id: Math.floor(Math.random() * 10000),
  }
  const jsonData = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8');
  const notes = JSON.parse(jsonData);
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));
  res.json(newNote);
  })

  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const jsonData = fs.readFileSync(path.join(__dirname, './db/db.json'));

    let notes = JSON.parse(jsonData);


    notes = notes.filter(n => n.id != noteId);


    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));

    res.json("successfully deleted note");

})


app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});