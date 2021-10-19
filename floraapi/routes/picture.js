const express = require('express');
const router = express.Router();
const pool = require('../database')
const multer = require('multer');

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/test/')
      },
    filename: function (req, file, cb) {
      cb(null, file.originalname)}
  });

  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

  router.post('/',upload.single('image_Name'), (req,res,next)=>{
 try {
    const Flora_id = req.body.Flora_id;
    const image_Name= req.file.path;

    pool.query('insert into image (image_Name,Flora_id) values(?,?) ', [image_Name,Flora_id]).then((data)=>{
      res.status(200).json(data);
             }).catch((err)=>{
              res.status(500).json(err);
             });
               
 } catch (error) {
    res.status(400).send(error.message)

 }
  }),
  router.put('/',upload.single('image_Name'), (req,res,next)=>{
    try {
       const Image_id = req.body.Image_id;
       const image_Name= req.file.path;
       
       pool.query('update image set image_Name = ? where Image_id = ? ', [image_Name,Image_id]).then((data)=>{
         res.status(200).json(data);
                }).catch((err)=>{
                 res.status(500).json(err);
                });
                  
    } catch (error) {
       res.status(400).send(error.message)
    }
     }),
     router.delete('/:Image_id',async function(req,res){
      try {
        const Image_id = req.params.Image_id;
        const sqlQuery = 'delete from image where Image_id=?';
        const result = await pool.query(sqlQuery,Image_id)
       
        res.status(200).json({userId: result.Image_id});
        
      } catch (error) {
        res.status(400).send(error.message)
      }
    })
  router.get('/', async function(req, res, next) {
    try {
      const sqlQuery = 'select * from image';
      const rows = await pool.query(sqlQuery);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

  

  //select flora.Flora_id, image.image_Name from flora  inner join image on flora.Flora_id = image.Flora_id where flora.Flora_id =3
  router.get('/getImageid/:id', async function(req, res, next) {
    try {
      const Flora_id = req.params.id;
      const image_Name = req.body;
      const sqlQuery="select image.image_Name from flora inner join image on flora.Flora_id = image.Flora_id where flora.Flora_id =?"
      const rows = await pool.query(sqlQuery,[Flora_id,image_Name]);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

  router.get('/getnewspecies', async function(req, res, next) {
    try {
      const Flora_id = req.params.Flora_id;
      const sqlQuery = 'select image_Name from image where Flora_id=1';
      const rows = await pool.query(sqlQuery,{Flora_id});
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });
  router.get('/getnewrecords', async function(req, res, next) {
    try {
      const Flora_id = req.params.Flora_id;
      const sqlQuery = 'select image_Name from image where Flora_id=3';
      const rows = await pool.query(sqlQuery,{Flora_id});
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });

module.exports=router;