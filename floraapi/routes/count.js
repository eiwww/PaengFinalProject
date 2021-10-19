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
 
  router.get('/getGenusCount/genus', async function(req, res, next) {
   try {   
       
      await pool.query('select count(*) as getGenus from genus').then((data)=>{
         res.status(200).json(data[0].getGenus);
                }).catch((err)=>{
                 res.status(500).json(err);
                });
                  
    } catch (error) {
       res.status(400).send(error.message)
   
    }
 });
 //select count(*) as getNewRecords from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id  = finding.Finding_id where finding.Finding_Name = "ພືດຊະນິດໃໝ່ໃນໂລກ"
 router.get('/getNewRecords/Report/', async function(req, res, next) {
   try {   
       
      await pool.query('select count(*) as getNewRecords from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id  = finding.Finding_id where finding.Finding_Name = "ພືດຊະນິດໃໝ່ໃນໂລກ"'
      ).then((data)=>{
         res.status(200).json(data[0].getNewRecords);
                }).catch((err)=>{
                 res.status(500).json(err);
                });
                  
    } catch (error) {
       res.status(400).send(error.message)
   
    }
 });

 router.get('/getSpecies/species', async function(req, res, next) {
   try {   
       
      await pool.query('select count(*) as getSpecies from species').then((data)=>{
         // res.status(200).json(data);
         //        }).catch((err)=>{
         //         res.status(500).json(err);
         //        });
         res.status(200).json(data[0].getSpecies);
                }).catch((err)=>{
                 res.status(500).json(err);
                });
                  
    } catch (error) {
       res.status(400).send(error.message)
   
    }
 });


//get each province of upload or flora
//select count(*) from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id = finding.Finding_id where province.Province_Name='ຈໍາປາສັກ'  
router.get('/getProvince/champasak', async function(req, res, next) {
   try {   
       
      await pool.query("select count(*) as n from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id = finding.Finding_id where province.Province_Name='ຈໍາປາສັກ'").then((data)=>{
         res.status(200).json(data[0].n);
                }).catch((err)=>{
                 res.status(500).json(err);
                });
                  
    } catch (error) {
       res.status(400).send(error.message)
   
    }
 });

 router.get('/getProvince/salavan', async function(req, res, next) {
   try {   
       
      await pool.query("select count(*) as salavan from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id = finding.Finding_id where province.Province_Name='ສາລະວັນ'").then((data)=>{
         res.status(200).json(data[0].salavan);
                }).catch((err)=>{
                 res.status(500).json(err);
                });
                  
    } catch (error) {
       res.status(400).send(error.message)
   
    }
 });


 router.get('/getProvince/sekong', async function(req, res, next) {
   try {   
       
      await pool.query("select count(*) as sekong from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id = finding.Finding_id where province.Province_Name='ເຊກອງ'").then((data)=>{
         res.status(200).json(data[0].sekong);
                }).catch((err)=>{
                 res.status(500).json(err);
                });
                  
    } catch (error) {
       res.status(400).send(error.message)
   
    }
 });


 router.get('/getProvince/Attapue', async function(req, res, next) {
   try {   
       
      await pool.query("select count(*) as atp from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id = finding.Finding_id where province.Province_Name='ອັດຕະປື'").then((data)=>{
         res.status(200).json(data[0].atp);
                }).catch((err)=>{
                 res.status(500).json(err);
                });
                  
    } catch (error) {
       res.status(400).send(error.message)
   
    }
 });

 


//get Count Collector 
//select count(*) as getCollector from collector
router.get('/getCollector/collector', async function(req, res, next) {
   try {        
      await pool.query('select count(*) as getCollector from collector').then((data)=>{

         res.status(200).json(data[0].getCollector);
                }).catch((err)=>{
                 res.status(500).json(err);
                });
                  
    } catch (error) {
       res.status(400).send(error.message)
   
    }
 });

 
  router.get('/', async function(req, res, next) {
    try {   
       
       await pool.query('select count(*) as getFam from family').then((data)=>{
          res.status(200).json(data[0].getFam);
                 }).catch((err)=>{
                  res.status(500).json(err);
                 });
                   
     } catch (error) {
        res.status(400).send(error.message)
    
     }
  });



  module.exports = router;
