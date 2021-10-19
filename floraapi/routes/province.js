const { Router } = require('express');
const express = require('express');
const pool = require('../database');
const router = express.Router();


/* GET users listing. */
router.get('/:image_id', async function(req, res, next) {
    try {
      const sqlQuery = 'select Province_id Province_Name from province where Province_id=?';
      const rows = await pool.query(sqlQuery, req.params.Province_id);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({ProvinceID:req.params.Province_id})
  });

//  router.get('/', async function(req, res, next) {
//     try {
//       const sqlQuery = 'select Family_Name from family';
//       const rows = await pool.query(sqlQuery);
//       res.status(200).json(rows);
//     } catch (error) {
//       res.status(400).send(error.message)
//     }
//     res.status(200).json({sqlQuery})
//   });
  router.get('/', async function(req, res, next) {
    try {
      const sqlQuery = 'select * from province';
      const rows = await pool.query(sqlQuery);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

router.post('/', async function(req,res){
    try { 
      const Province_Name = req.body.Province_Name;
      const sqlQuery = 'insert into province (Province_Name) values (?)';
      const result = await pool.query(sqlQuery,Province_Name);
  
      res.status(200).json({userId: result.InsertId});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  //delete, by id
  router.delete('/:Province_id',async function(req,res){
    try {
      const Province_id = req.params.FamilyID;

      const sqlQuery = 'delete from province where Province_id=?';
      const result = await pool.query(sqlQuery,Province_id)
     
      res.status(200).json({userId: result.Family_id});
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  router.delete('/',async function(req,res){
    try {
      const sqlQuery = 'delete from province';
      const result = await pool.query(sqlQuery)
     
      res.status(200).json({userId: result});
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  //update, by id
  router.put('/', async function(req,res){
    try {
      const Province_id = req.body.Province_id;
      const Province_Name = req.body.Province_Name;

      const sqlQuery = 'update province set Province_Name = ? where Province_id = ?';
      const result = await pool.query(sqlQuery,  [Province_Name,Province_id]);
  
      res.status(200).json({userId: result.Province_id});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

 
  module.exports = router;
  