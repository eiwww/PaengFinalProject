const express = require('express');
const pool = require('../database');
const router = express.Router();


router.get('/:research_id', async function(req, res, next) {
    try {
      const sqlQuery = 'select Researcher_id, Researcher_Name,Researcher_Surname, Institution, usrole_id from researcher where Researcher_id=?';
      const rows = await pool.query(sqlQuery, req.params.Genus_id);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({Genus_id:req.params.Genus_id})
  });

  router.get('/', async function(req, res, next) {
    try {
      const {Researcher_Name,Researcher_Surname,Institution,usrole_name ,usrole_id} = req.body;
      const sqlQuery = 'select researcher.Researcher_Name, researcher.Researcher_Surname,researcher.Institution,user_role.usrole_name from researcher inner join user_role on researcher.usrole_id = user_role.usrole_id  ';
      const rows = await pool.query(sqlQuery,Researcher_Name,Researcher_Surname,Institution,usrole_name ,usrole_id);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

router.post('/', async function(req,res){
    try { 
      const {Researcher_Name,Researcher_Surname,Institution,usrole_id} = req.body;

     const sqlQuery = 'insert into researcher (Researcher_Name,Researcher_Surname,Institution,usrole_id) values (?,?,?,?)';
      const result = await pool.query(sqlQuery, [Researcher_Name,Researcher_Surname,Institution,usrole_id]);
  
      res.status(200).json({userId: result.InsertId});
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

  module.exports = router;
