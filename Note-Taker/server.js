const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001
const fs = require('fs');
const noteData = require('./develop/db/db.json');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'develop', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/develop/public/notes.html'))
});

app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {
  const {title, text} = req.body;
  const newNote = {
      title,
      text,
      id: Math.floor(Math.random() * 10000),
  }
  const jsonData = fs.readFileSync(path.join(__dirname, 'develop', 'db', 'db.json'), 'utf8');
  const notes = JSON.parse(jsonData);
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'develop', 'db', 'db.json'), JSON.stringify(notes));
  res.json(newNote);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    const deleteNote = noteData.findIndex(note => note.id === noteId);
    if (deleteNote !== -1) {
      noteData.splice(deleteNote, 1);
      fs.writeFileSync(path.join(__dirname, 'develop', 'db', 'db.json'), JSON.stringify(noteData));
        res.status(204).send(); // 204 No Content indicates successful deletion
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    });

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});