const { Router } = require('express');
const express = require('express');
const pool = require('../database');
const router = express.Router();


/* GET users listing. */
router.get('/:District_id', async function(req, res, next) {
    try {
      const sqlQuery = 'select District_id, District_Name,Family_id from genus where Genus_id=?';
      const rows = await pool.query(sqlQuery, req.params.District_id);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({Genus_id:req.params.Genus_id})
  });

  router.get('/', async function(req, res, next) {
    try {
      const {District_id,District_Name,Province_Name,Province_id} = req.body;
      const sqlQuery = 'select district.District_id, district.District_Name, province.Province_Name from district inner join province on district.Province_id = province.Province_id';
      const rows = await pool.query(sqlQuery,District_id,District_Name,Province_Name,Province_id);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

  router.get('/getdistrict/:id', async function(req, res, next) {
    try {
      const Province_id = req.params.id;
      const sqlQuery = 'select District_id, District_Name from district where Province_id = ?';
      const rows = await pool.query(sqlQuery,[Province_id]);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });


router.post('/', async function(req,res){
    try { 
      const District_Name = req.body.District_Name;
      const Province_id= req.body.Province_id;
      const sqlQuery = 'insert into district (District_Name,Province_id) values (?,?)';
      const result = await pool.query(sqlQuery, [District_Name,Province_id]);
  
      res.status(200).json({userId: result.InsertId});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

  router.delete('/:id',async function(req,res){
    try {
      const District_id = req.params.id;
      const sqlQuery = 'delete from district where District_id=?';
      const result = await pool.query(sqlQuery,District_id)
     
      res.status(200).json({userId: result.District_id});
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

  router.put('/', async function(req,res){
    try {
      const District_id = req.body.District_id;
      const District_Name = req.body.District_Name;

      const sqlQuery = 'update district set District_Name = ? where District_id = ?';
      const result = await pool.query(sqlQuery,  [District_Name,District_id]);
  
      res.status(200).json({userId: result.District_id});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

  module.exports = router;
  