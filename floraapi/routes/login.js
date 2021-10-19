const { Router } = require("express");
const express = require("express");
const pool = require("../database");
const router = express.Router();
const bcrpt = require("bcrypt");


    router.post('/', async function(req,res){
        try {
          const {User_id,password} = req.body;
        
          const sqlQuery ='select password from user where User_id=?'
          const rows = await pool.query(sqlQuery,User_id);
          if(rows){
           const isValid = await bcrpt.compare(password,rows[0].password)
           res.status(200).json({valid_password: isValid})
          }
          res.status(200).send(`User with id ${User_id} was not found`)
        
        } catch (error) {
          res.status(400).send(error.message)
        
        }
        
          })

module.exports = router;
