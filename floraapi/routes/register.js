const express = require("express");
const pool = require("../database");
const router = express.Router();
const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { token } = require("morgan");
const createHttpError = require("http-errors");


/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const sqlQuery = "select * from user";
    const rows = await pool.query(sqlQuery);

    res.status(200).json({ user: rows });
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});
router.get("/checkrole", async function (req, res, next) {
  try {
    //select usrole_id from user where usrole_id=2
    const {
      User_Name,
      User_Surname,
      Gender,
      Institution,
      username,
      password,
      usrole_name,
      usrole_id,
    } = req.body;
    const sqlQuery =
      "select user.User_Name, user.User_Surname, user.Gender, user.Institution, user.username, user.password, user_role.usrole_name from user inner join user_role on user.usrole_id = user_role.usrole_id ";
    const rows = await pool.query(sqlQuery, [
      User_Name,
      User_Surname,
      Gender,
      Institution,
      username,
      password,
      usrole_name,
      usrole_id,
    ]);
    res.status(200).json({ user: rows });
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});

function verifytoken(req, res ,next) {
  const bearerHeader = req.headers["authorization"];

  if(typeof bearerHeader !== "undefined"){
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  }else{
    res.status(403);
  }
}

router.get("/us", verifytoken, (req,res) => {
  const privateKey = fs.readFileSync(__dirname + "/../config/private.key");

  jwt.verify(req.token, privateKey, (err,authdata) => {
    if(err){
      res.sendStatus(404)
    }else{
      const udata = authdata;
      res.send(authdata);

    }
  })
})

router.get("/userdata", async function (req, res, next) {
  
  try {
        const { email, Gender,password,User_Surname, Institution,Country,usrole_name, usrole_id } = req.body;
        const sqlQuery =
        "select user.User_id, user.Gender, user.User_Name, user.User_Surname, user.Institution, user.Country, user.email, user.password, user_role.usrole_name from user inner join user_role on user.usrole_id = user_role.usrole_id ";
      const rows = await pool.query(sqlQuery, [
        email,
        Gender,
        User_Surname, Institution,Country,
        usrole_name,
        password,
        usrole_id
      ]);
      res.status(200).send(rows)
       
  } catch (error) {
    res.status(400).send(error.message);
  }
  //res.status(200).json({ sqlQuery });
});

router.post("/", async function (req, res) {
  //const Role ='User'
  const {
    User_Name,
    User_Surname,
    Gender,
    Institution,
    Country,
    email,
    password,
  } = req.body;
  const encrptedPassword = await bcrpt.hash(password, 10);

  const checkusername = "select email from user where email=?";
  const checkrows = await pool.query(checkusername, email);
  if (checkrows.length >= 1) {
    return res.status(409).json({
      message: "email exists",
    });
  }
  const sqlQuery =
    "insert into user (User_Name,User_Surname,Gender,Institution,Country,email,password) values (?,?,?,?,?,?,?)";
  const result = await pool.query(sqlQuery, [
    User_Name,
    User_Surname,
    Gender,
    Institution,
    Country,
    email,
    encrptedPassword,
  ]);

  res.status(200).json({ userId: result.InsertId });

  res.status(400).send(error.message);
});

router.delete("/logout", async function (req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) throw createHttpError(refreshToken);
  const id = await verifyRefreshToken(refreshToken);
  clientInformation.DEL(id, (err, val) => {
    if (err) {
      console.log(err.message);
      throw createHttpError.InternalServerError();
    }
  });
  console.log(val);
});

router.post("/login", async function (req, res) {
  const privateKey = fs.readFileSync(__dirname + "/../config/private.key");
  try {
    const { email, password, usrole_id } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const sqlQuery = "select user.User_id, user.User_Name, user.User_Surname, user.email,user.password, user_role.usrole_name from user inner join user_role on user.usrole_id = user_role.usrole_id where email=?";

    const rows = await pool.query(sqlQuery, email,usrole_id);

    if (
      rows &&
      (await bcrpt.compare(password, rows[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "fail",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              user: [rows[0].email, rows[0].usrole_name, rows[0].User_id, rows[0].User_Name, rows[0].User_Surname],
            },
            privateKey,
            {
              expiresIn: "30d",
            }
          );
          return res.status(200).json({
            message: "login successfully",
            token: token,
          });

          // jwt.sign({user: rows[0].email}, privateKey, (er, token) => {
          //   if(er) return res.status(400);
          //   res.status(200)   
          //   res.send(rows[0].email)
          //   //res.json({token})
          // })
        }
      }))
    )
      res.status(200).send(`User with id ${email} was not found`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//delete, by id
router.delete("/:User_id", async function (req, res) {
  try {
    const User_id = req.params.User_id;

    const sqlQuery = "delete from user where User_id = ?";
    const result = await pool.query(sqlQuery, User_id);

    res.status(200).json({ userId: result.User_id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});



//update user to be as admin
router.put("/", async function (req, res) {
  try {
    const User_id = req.body.User_id;
    const usrole_id = req.body.usrole_id;

    const sqlQuery = "update user set usrole_id = ? where User_id = ?";
    const result = await pool.query(sqlQuery, [usrole_id, User_id]);

    res.status(200).json({ userId: result.User_id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});



module.exports = router;
