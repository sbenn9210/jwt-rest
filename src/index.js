const express = require('express');
const helmet = require('helmet');
const db = require('../src/db/models');
const bcrypt = require('bcrypt');

const port = 4000;

const app = express();

app.use(helmet());

app.use(express.json({ extended: false }));

const saltRounds = 10;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    req.body.password = hash
    db.User.create(req.body).then(newUser => res.send(newUser));
  });
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
