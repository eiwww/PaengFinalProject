const express = require('express')
const router = express.Router()
const pool = require('../database')
const multer = require('multer')

exports.image = function(req, res){
  message = '';
 
    if (!req.files)
              return res.status(400).send('No files were uploaded.');

      var file = req.files.uploaded_image;
      var img_name=file.name;

       if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                               
            file.mv('public/test'+file.name, function(err) {
                           
                if (err)

                  return res.status(500).send(err);
                      var sql = "INSERT INTO `images`(`image_name`) VALUES ('" + img_name + "')";

                          var query = pool.query(sql, function(err, result) {
                               res.redirect('index'+result.insertId);
                          });
                     });
        } else {
          message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
          res.render('index',{message: message});
        }
 
    res.render('index');
  
};

module.exports = router