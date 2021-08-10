// auth router
const User = require("../models/User");
const express = require("express");
const cors=require("cors");
const router = express.Router();
router.post("/signup", cors(), (req, res) => {
  console.log(req.body);
  const { username, password, email, name } = req.body;
  const usr = new User({ username, password, email, name });
  usr.save((err) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(usr);
      console.log(usr);
    }
  });
});
router.post("/login", cors(), (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, result) => {
    if (!result) {
      res.send({ auth: false, msg: "User not found" });
    } else {
      res.send({
        auth: true,
        msg: `Logged in as ${result.email}`,
        token: result._id,
      });
    }
  });
});
router.post("/authenticate", cors(), (req, res) => {
  const { tok } = req.body;
  User.findOne({ _id: tok }, (err, result) => {
    if (!result) {
      res.send({ success: false, msg: "farji user" });
    } else {
      res.send({ success: true, msg: result });
    }
  });
});
module.exports = router;
