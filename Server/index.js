const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("../Server/Models/Users");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://@cluster0.x3ou1a3.mongodb.net/Auth"
  )
  .then(() => {
    console.log("MongoDB is Connected...");
  })
  .catch((err) => console.log(err));

app.post("/reg", (req, res) => {
  UserModel.create(req.body)
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { Email, Password } = req.body;
  console.log(req.body);
  UserModel.findOne({ Email: Email })
    .then((user) => {
      if (user) {
        if (user.Password === Password) {
          res.json("Success");
        } else {
          res.json("Invalid Email/Password");
        }
      } else {
        res.json("No Record is Found");
      }
    })
    .catch((err) => res.json("User is not registered"));
});

app.listen(3001, () => {
  console.log("Server is Running...");
});
