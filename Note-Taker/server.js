const express = require('express');
const path = require('path');
const PORT = 3001;
const noteData = require('./Develop/db/db.json');

const app = express();

app.use(express.static(path.join(__dirname, 'develop', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/develop/public/notes.html'))
});


app.get('/api/notes', (req, res) => res.json(noteData));
console.log(noteData);

app.post('/api/notes', (req, res) => {

  const {title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text
    };

    const response = {
      status: 'success',
      body: newNote,
    };
  } else {
    res.status(500).json('Error in posting review');
  }
});


app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});