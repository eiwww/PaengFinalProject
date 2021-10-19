const { Router } = require('express');
const express = require('express');
const pool = require('../database');
const router = express.Router();


/* GET users listing. */
router.get('/:Finding_id', async function(req, res, next) {
    try {
      const sqlQuery = 'select Finding_id, Finding_Name,Create_date from finding where Finding_id=?';
      const rows = await pool.query(sqlQuery, req.params.Fingding_id);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({Finding_id:req.params.Finding_id})
  });
 
  router.get('/', async function(req, res, next) {
    try {
      const sqlQuery = 'select * from finding';
      const rows = await pool.query(sqlQuery);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

 

router.post('/', async function(req,res){
    try { 
      const Finding_Name = req.body.Finding_Name;
      const sqlQuery = 'insert into finding (Finding_Name) values (?)';
      const result = await pool.query(sqlQuery,Finding_Name);
  
      res.status(200).json({userId: result.InsertId});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  //delete, by id
  router.delete('/:Finding_ID',async function(req,res){
    try {
      const Finding_id = req.params.FindingID;

      const sqlQuery = 'delete from finding where Finding_id=?';
      const result = await pool.query(sqlQuery,Finding_id)
     
      res.status(200).json({userId: result.Finding_id});
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  router.delete('/',async function(req,res){
    try {
      const sqlQuery = 'delete from finding';
      const result = await pool.query(sqlQuery)
     
      res.status(200).json({userId: result});
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  //update, by id
  router.put('/', async function(req,res){
    try {
      const Finding_id = req.body.Finding_id;
      const Finding_Name = req.body.Finding_Name;

      const sqlQuery = 'update finding set Finding_Name = ? where Finding_id = ?';
      const result = await pool.query(sqlQuery,  [Finding_Name,Finding_id]);
  
      res.status(200).json({userId: result.Finding_id});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })


  module.exports = router;
