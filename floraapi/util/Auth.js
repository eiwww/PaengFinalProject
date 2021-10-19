const User = require("../models/user");
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const {SECRET} = require('../config')

const userRegister = async (userDets, role, res) => {
  try {
    //validate the user
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "Username is already taken",
        success: false,
      });
    }
    //validate the email
    let emailNotRegister = await validateUsername(userDets.email);
    if (!emailNotRegister)
      return res.status(400).json({
        message: "email is already taken",
        success: false,
      });

    //get the hashed password
    const hasehdPassword = await bcrpyt.hash(userDets.password, 12);
    //create a new user
    const newUser = new User({
      ...userDets,
      password: hasehdPassword,
    });
    await newUser.save();
    return res.status(201).json({
      message: "ja dai bor ni",
      success: true
    });
  } catch (err) {
      //implement logger function ()
      return res.status(500).json({
        message: "Unable to create your account",
        success: false
      })
  }
};

const userLogin = async (userCreds, role, res)=>{
  
}

const validateUsername = async (username) => {
  let user = User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = User.findOne({ email });
  return user ? false : true;
};

module.exports =  {
    userRegister
}
