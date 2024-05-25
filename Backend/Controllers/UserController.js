const express = require("express");
const { UserModel } = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "ankitmernStackwebdeveloper@78";

async function Signup(req, res) {
  const { name, email, password } = req.body;
  //   console.log(req.body);

  if (!name || !email || !password)
    return res.status(404).json({ msg: "pl.enter the field" });

  const salt = await bcrypt.genSalt(10);
  const secPassword = await bcrypt.hash(password, salt);

  try {
    const Preuser = await UserModel.findOne({ email });
    if (Preuser) {
      return res.status(400).json({ msg: "User Already Exits" });
    } else {
      const user = await UserModel.create({
        name: name,
        email: email,
        password: secPassword,
      });
      // console.log(user);
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function Login(req, res) {
  const email = req.body.email;
  // console.log(email);
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    } else {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordMatch) {
        return res.status(500).json({ msg: "invalid userName and Password" });
      }
    }
    const data = {
      id: user._id,
    };
    const authToken = jwt.sign(data, jwtSecret);
    // console.log(authToken);
    return res.status(200).json({
      success: true,
      authToken: authToken,
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}
module.exports = { Signup, Login };
