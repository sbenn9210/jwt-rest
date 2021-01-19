const express = require('express');
const helmet = require('helmet');
const db = require('../src/db/models');

const port = 4000;

const app = express();

app.use(helmet());

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', (req, res) => {
  db.User.create(req.body).then(newUser => res.send(newUser));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
