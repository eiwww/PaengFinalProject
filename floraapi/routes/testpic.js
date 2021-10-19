const express = require('express');
//const fileUpload = require('express-fileupload');
const router = express.Router();
const pool = require('../database')
// const mullter = require('multer')
// const upload = multer({dest: '/public/images/'});

// router.get('/', async function (req,res) {
//      try {
//         const {Image, Vernacular_Name,Flora_id} = req.body;
//         const sqlQuery = 'select image.Image, flora.Vernacular_Name from image inner join flora on image.Flora_id = flora.Flora_id  ';
//         const rows = await pool.query(sqlQuery, {Image,Vernacular_Name,Flora_id});
//        res.status(200).json(rows);
//   } catch (error) {
//      res.status(400).send(error.message)
//   }
//      // res.status(200).json({sqlQuery})
// // res.render('profile')
// });

// router.get('/upload', async function (req,res) {

//   // res.status(200).json({sqlQuery})
//  res.render('picture')
// });
// router.post('/',async function (req,res) {
//     const Flora_id = req.body.id;
//     let picture = req.files.picture;
//     let uploadPath = "public/images/" + picture.name;

//       const checkimage = 'select Image from image where Image=?'
//       const checkrows = await pool.query(checkimage,picture.name);
//       if(checkrows.length>=1){
//         console.log('bor dai');
//         return res.status(400).send('file exists');
//       }
//       if (!req.files || Object.keys(req.files).length >1 ) {
//        console.log('upload pic kon');
//        return res.status(400).send('No files were uploaded.');
//      }
//      else{
//       if(picture.mimetype == "image/jpeg" ||picture.mimetype == "image/png"||picture.mimetype == "image/gif"||picture.mimetype == "application/pdf"){
//         picture.mv(uploadPath, function (err) {
//           if (err) return res.status(500).send(err);
      
//              pool.query('insert into image (Image,Flora_id) values(?,?) ', [picture.name,Flora_id], (err, rows) => {
//                  if (!err) {
//                    res.send('dai leoo');;
//                  } else {
//                    console.log(err);
//                  }
//                });
//              })
//          }else{
//        console.log('This format is not allowed , please upload file with');
//            res.send('dai tae file jpeg, png, pdf jaaa')
//          }
//              }

   
// })
router.get('/', async function(req, res, next) {
  try {
    const sqlQuery = 'select * from test2';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
  res.status(200).json({sqlQuery})
});



router.post('/', async function(req,res){
  try { 
    
    const name = req.body.name;
    const id = req.body.id;
       
    const sqlQuery = 'insert into test2 (Name,id) values (?,?)';
    const result = await pool.query(sqlQuery,[name,id]);
    
    res.status(200).json({userId: result});
  } catch (error) {
    res.status(400).send(error.message)
  }
})

 module.exports=router;