const { Router } = require('express');
const express = require('express');
const pool = require('../database');
const router = express.Router();


/* GET users listing. */

  router.get('/', async function(req, res, next) {
    try {
      const sqlQuery = 'select * from user_role';
      const rows = await pool.query(sqlQuery);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

router.post('/', async function(req,res){
    try { 
      const usrole_name = req.body.usrole_name;
      //const encrptedPassword = await bcrpt.hash(password,10);     
      const sqlQuery = 'insert into user_role (usrole_name) values (?)';
      const result = await pool.query(sqlQuery, usrole_name);
  
      res.status(200).json({userId: result.InsertId});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  //delete, by id
  router.delete('/:usrole_id',async function(req,res){
    try {
      const usrole_id = req.params.usrole_id;

      const sqlQuery = 'delete from user_role where  usrole_id=?';
      const result = await pool.query(sqlQuery,usrole_id)
     
      res.status(200).json({userId: result.usrole_id});
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  router.delete('/',async function(req,res){
    try {

      const sqlQuery = 'delete from user_role ';
      const result = await pool.query(sqlQuery)
     
      res.status(200).json({userId: resul});
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  //update, by id
  router.put('/', async function(req,res){
    try {
      const FamilyID = req.body.FamilyID;
      const FamilyName = req.body.FamilyName;

      const sqlQuery = 'update family set FamilyName = ? where FamilyID = ?';
      const result = await pool.query(sqlQuery,  [FamilyName,FamilyID]);
  
      res.status(200).json({userId: result.FamilyID});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

 
  module.exports = router;
  