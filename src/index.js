const express = require('express');
const helmet = require('helmet');
const db = require('../src/db/models');
const bcrypt = require('bcrypt');

const port = 4000;

const app = express();

app.use(helmet());

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await db.User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ msg: 'This user already exists' });
    } else {
      let user = await db.User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });
      res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
