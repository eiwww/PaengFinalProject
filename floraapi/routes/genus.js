const { Router } = require('express');
const express = require('express');
const pool = require('../database');
const router = express.Router();


/* GET users listing. */
router.get('/:Genus_id', async function(req, res, next) {
    try {
      const sqlQuery = 'select Genus_id, Genus_Name,Family_id from genus where Genus_id=?';
      const rows = await pool.query(sqlQuery, req.params.Genus_id);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({Genus_id:req.params.Genus_id})
  });

  router.get('/', async function(req, res, next) {
    try {
      const {Genus_id,Genus_Name,Family_Name,Family_id} = req.body;
      const sqlQuery = 'select genus.Genus_id, genus.Genus_Name, family.Family_Name from genus inner join family on genus.Family_id = family.Family_id  ';
      const rows = await pool.query(sqlQuery,Genus_id,Genus_Name,Family_Name,Family_id);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

  router.get('/getgenusname', async function(req, res, next) {
    try {
      const sqlQuery = 'select * from genus';
      const rows = await pool.query(sqlQuery);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

router.post('/', async function(req,res){
    try { 
      const Genus_Name = req.body.Genus_Name;
      const Family_id= req.body.Family_id;
      
      const checkgenusname = 'select Genus_Name from genus where Genus_Name=?'
      const checkrows = await pool.query(checkgenusname,Genus_Name);
      if(checkrows.length>=1){
return res.status(409).json({
  message: "Family_name exists"
})}
      //const encrptedPassword = await bcrpt.hash(password,10);     
      const sqlQuery = 'insert into genus (Genus_Name,Family_id) values (?,?)';
      const result = await pool.query(sqlQuery, [Genus_Name,Family_id]);
  
      res.status(200).json({userId: result.InsertId});
    } catch (error) {
      res.status(400).send(error.message)
    }
  }),

  router.get('/getgenus/:id', async function(req, res, next) {
    try {
      const Family_id = req.params.id;
      const sqlQuery = 'select Genus_id, Genus_Name from genus where Family_id = ?';
      const rows = await pool.query(sqlQuery,[Family_id]);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });
  router.put('/', async function(req,res){
    try {
      const Genus_id = req.body.Genus_id;
      const Genus_Name = req.body.Genus_Name;

      const sqlQuery = 'update genus set Genus_Name = ? where Genus_id = ?';
      const result = await pool.query(sqlQuery,  [Genus_Name,Genus_id]);
  
      res.status(200).json({result});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })


  //delete, by id
  //update, by id


  module.exports = router;
  