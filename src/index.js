const express = require("express");
// const helmet = require("helmet");
const { User } = require("./db/models");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync('bacon', 8);

const port = 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const user = await User.create({name:req.body.name, email:req.body.email, password:req.body.password, hash: hash});

  bcrypt.genSalt().then(salt => {
    bcrypt.hash("password", salt).then(hash =>{
      console.log(hash);
    });
  })

  console.log(req.body.name)
  res.json(user);
 
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
