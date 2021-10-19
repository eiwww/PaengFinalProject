// const express = require('express');
// const router = express.Router();
// const imageController = require('../controllers/image-controller')

//  router.get('/',imageController.imageUploadForm);
//  router.post('/',imageController.storeImage);

// router.post('/', async function(req,res) {
//   let   sampleFile = req.files.sampleFile;;
//   let uploadPath;

//    if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//    }else{

//     uploadPath = 'C:/Users/Khankeo/floraapi/uploads/' + sampleFile.name;

//     console.log(sampleFile);

//     // Use mv() to place file on the server
//     sampleFile.mv(uploadPath, function (err) {
//       if (err) return res.status(500).send(err);

//         pool.query('insert into pic (image) values (?)', [sampleFile.name], (err, rows) => {
//           if (!err) {
//             res.send('dai leo');
//           } else {
//             console.log(err);
//           }
//         });
//       });
//    }

// name of the input is sampleFile

//})
const express = require("express");
const router = express.Router();
const pool = require("../database");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5  },
  fileFilter: fileFilter,
});

router.post("/", upload.single("image_name"), (req, res, next) => {
  try {
   // const reqFiles = [];
    const image_name= req.file.path;
  
  // let sampleFile = req.files.image_name
 //const image_name = req.file.image_name;
//const image_name = "public\\images\\" + req.body.image_n;
    pool
      .query("insert into images (image_name) values(?) ", [image_name])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const sqlQuery = "select * from images";
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});

module.exports = router;
