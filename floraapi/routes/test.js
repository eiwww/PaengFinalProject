const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const pool = require('../database')
const t = express();
t.use(fileUpload());

// router.get('/', async function (req,res) {
//      try {
//    const sqlQuery = 'select * from images';
//      const rows = await pool.query(sqlQuery);
//        res.status(200).json(rows);
//   } catch (error) {
//      res.status(400).send(error.message)
//   }
//      // res.status(200).json({sqlQuery})
// // res.render('profile')
// });

// router.get('/upload', async function (req,res) {

//   // res.status(200).json({sqlQuery})
//  res.render('profile')
// });
// router.post('/',async function (req,res) {
//     let sampleFile = req.files.sampleFile;
    // let uploadPath = "public/flora_image/" + sampleFile.name;

//       const checkimage = 'select image_name from images where image_name=?'
//       const checkrows = await pool.query(checkimage,sampleFile.name);
//       if(checkrows.length>=1){
//         console.log('bor dai');
//         return res.status(400).send('file exists');
//       }
//       if (!req.files || Object.keys(req.files).length >1 ) {
//        console.log('upload pic kon');
//        return res.status(400).send('No files were uploaded.');
//      }
//      else{
//       if(sampleFile.mimetype == "image/jpeg" ||sampleFile.mimetype == "image/png"||sampleFile.mimetype == "image/gif"||sampleFile.mimetype == "application/pdf"){
//         sampleFile.mv(uploadPath, function (err) {
//           if (err) return res.status(500).send(err);
      
//              pool.query('insert into images (image_name) values(?) ', [sampleFile.name], (err, rows) => {
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

   
//})
router.get('/', async function(req, res, next) {
  try {
    const sqlQuery = 'select * from test';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
  res.status(200).json({sqlQuery})
});



router.post('/', async function(req,res){
  try { 
    
    const Name = req.body.Name
    const date = req.body.date  

    const sqlQuery = 'insert into test (Name,date) values (?,?)';
    const result = await pool.query(sqlQuery,[Name,date]);

    res.status(200).json({userId: result});
  } catch (error) {
    res.status(400).send(error.message)
  }
})


module.exports=router;