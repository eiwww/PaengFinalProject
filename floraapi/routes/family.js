const { Router } = require('express');
const express = require('express');
const pool = require('../database');
const router = express.Router();


/* GET users listing. */
router.get('/:Family_id', async function(req, res, next) {
    try {
      const sqlQuery = 'select Family_id, Family_Name from family where Family_id=?';
      const rows = await pool.query(sqlQuery, req.params.Family_id);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({FamilyID:req.params.Family_id})
  });
 
  router.get('/searchfam', async function(req, res, next) {
    try {
      const sqlQuery = `select * from family where Family_Name like 'a%'`;
      const rows = await pool.query(sqlQuery);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({FamilyID:req.params.Family_id})
  });
 
 
  router.get('/', async function(req, res, next) {
    try {
      const sqlQuery = 'select * from family';
      const rows = await pool.query(sqlQuery);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

 

router.post('/', async function(req,res){
    try { 
      
      const Family_Name = req.body.Family_Name;
      
      const checkfamilyname = 'select Family_Name from family where Family_id=?'
      const checkrows = await pool.query(checkfamilyname,Family_Name);
      if(checkrows.length>=1){
return res.status(409).json({
  message: "username exists"
})
      }
      //const encrptedPassword = await bcrpt.hash(password,10);     
      const sqlQuery = 'insert into family (Family_Name) values (?)';
      const result = await pool.query(sqlQuery,Family_Name);
  
      res.status(200).json({result});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  //delete, by id
  router.delete('/:FamilyID',async function(req,res){
    try {
      const Family_id = req.params.FamilyID;
      const sqlQuery = 'delete from family where Family_id=?';
      const result = await pool.query(sqlQuery,Family_id)
     
      res.status(200).json({userId: result.Family_id});
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  router.delete('/',async function(req,res){
    try {
      const sqlQuery = 'delete from family';
      const result = await pool.query(sqlQuery)
     
      res.status(200).json({userId: result});
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  //update, by id
  router.put('/', async function(req,res){
    try {
      const Family_id = req.body.Family_id;
      const Family_Name = req.body.Family_Name;

      const sqlQuery = 'update family set Family_Name = ? where Family_id = ?';
      const result = await pool.query(sqlQuery,  [Family_Name,Family_id]);
  
      res.status(200).json({userId: result.Family_id});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })


  module.exports = router;
