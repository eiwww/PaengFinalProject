const { Router } = require("express");
const express = require("express");
const { Forbidden } = require("http-errors");
const pool = require("../database");
const router = express.Router();


router.get("/", async function (req, res, next) {
  try {
    const sqlQuery = "select * from upload";
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});


router.get("/getLocate", async function (req, res, next) {
  try { 
    const {id,Species_Name,Genus_Name,Family_Name,Flora_id,image_Name,Species_id,Genus_id,Family_id}=req.body;
    const sqlQuery = "select upload.id,species.Species_Name, genus.Genus_Name,family.Family_Name, flora.Flora_id, image.image_Name from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id where status=1 group by Flora_id ";
    const rows = await pool.query(sqlQuery,[id,Species_Name,Genus_Name,Family_Name,Flora_id,image_Name,Species_id,Genus_id,Family_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});


router.get("/searchLocate/:fam", async function(req,res,next) {
try {
  const fam_search = req.params.fam
  const {id,Species_Name,Genus_Name,Family_Name,Flora_id,image_Name,Species_id,Genus_id,Family_id}=req.body;
  const sqlQuery = "select upload.id,species.Species_Name, genus.Genus_Name,family.Family_Name, flora.Flora_id, image.image_Name from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id where family.Family_Name LIKE '"+ fam_search +"%' group by Flora_id";
  const rows = await pool.query(sqlQuery,[id,Species_Name,Genus_Name,Family_Name,Flora_id,image_Name,Species_id,Genus_id,Family_id]);
  res.status(200).json(rows);
} catch (err) {
  console.log(err);
}

})
 

router.get("/getShow", async function (req, res, next) {
  try {
    const {id,Species_Name,Genus_Name,Family_Name,Flora_id,image_Name,Species_id,Genus_id,Family_id}=req.body;
    const sqlQuery = "select upload.id,species.Species_Name, genus.Genus_Name,family.Family_Name, flora.Flora_id, image.image_Name from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id group by Flora_id ";
    const rows = await pool.query(sqlQuery,[id,Species_Name,Genus_Name,Family_Name,Flora_id,image_Name,Species_id,Genus_id,Family_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});

router.get("/getLocation/:id", async function (req, res, next) {
  try {
const Flora_id = req.params.id;
    const {id,Species_Name,Genus_Name,Family_Name,Village_Name,District_Name,Province_Name,Finding_Name,image_Name,status,Collector_name,Species_id,Genus_id,Family_id,DetailCollect_id,Collector_id} = req.body;
    const sqlQuery =
      "select upload.id,species.Species_Name, genus.Genus_Name,family.Family_Name, village.Village_Name, district.District_Name, province.Province_Name, upload.Latitude, upload.Longtitude, upload.Altitude,flora.Flora_id, finding.Finding_Name, image.image_Name, upload.status, collector.Collector_name from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id = finding.Finding_id inner join detail_collector on upload.id=detail_collector.id inner join collector on collector.Collector_id = detail_collector.Collector_id where flora.Flora_id = ?";
    const rows = await pool.query(sqlQuery, 
      Flora_id,id,Species_Name,Genus_Name,Family_Name,Village_Name,District_Name,Province_Name,Finding_Name,image_Name,status,Collector_name,Species_id,Genus_id,Family_id,DetailCollect_id,Collector_id
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});

router.get("/getUpload/:id", async function (req, res, next) {
  try {
const Flora_id = req.params.id;
    const {id,Species_Name,Genus_Name,Family_Name,Village_Name,District_Name,Province_Name,Finding_Name,Species_id,Genus_id,Family_id} = req.body;
    const sqlQuery =
      "select upload.id,species.Species_Name, genus.Genus_Name,family.Family_Name, village.Village_Name, district.District_Name, province.Province_Name, upload.Latitude, upload.Longtitude, upload.Altitude,flora.Flora_id, finding.Finding_Name from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id = finding.Finding_id where flora.Flora_id = ?";
    const rows = await pool.query(sqlQuery, [
      Flora_id,id,Species_Name,Genus_Name,Family_Name,Village_Name,District_Name,Province_Name,Finding_Name,Species_id,Genus_id,Family_id
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});

router.get("/getReport/", async function (req, res, next) {
  try {
// const Flora_id = req.params.id;
    const {id,Species_Name,Genus_Name,Family_Name,Village_Name,District_Name,Province_Name,note,image_Name,Findind_Name,status,Species_id,Genus_id,Family_id,Finding_id} = req.body;
    const sqlQuery =
   "select upload.id,species.Species_Name, genus.Genus_Name,family.Family_Name, village.Village_Name, district.District_Name, province.Province_Name,flora.note,upload.Latitude, upload.Longtitude, upload.Altitude,flora.Flora_id, image.image_Name, finding.Finding_Name, upload.status from upload inner join flora on upload.Flora_id  = flora.Flora_id inner join image on flora.Flora_id = image.Flora_id inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id  = finding.Finding_id group by Flora_id";
    const rows = await pool.query(sqlQuery, [
id,Species_Name,Genus_Name,Family_Name,Village_Name,District_Name,Province_Name,note,image_Name,Findind_Name,status,Species_id,Genus_id,Family_id,Finding_id
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});

router.get("/getUpload", async function (req, res, next) {
  try {
    //select image.image_Name, species.Species_Name, genus.Genus_Name, family.Family_Name, flora.Vernacular_Name, flora.note, village.Village_Name, district.District_Name, province.Province_Name, upload.Latitude, upload.Longtitude, upload.Date_identify, finding.Finding_Name from image inner join flora on image.Flora_id = flora.Flora_id inner join upload on upload.Flora_id = flora.Flora_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id = finding.Finding_Name inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_Name inner join family on genus.Family_id  = family.Family_id
    const {
      image_Name,
      Species_Name,
      Genus_Name,
      Family_Name,
      Vernacular_Name,
      note,
      Village_Name,
      District_Name,
      Province_Name,
      Latitude,
      Longtitude,
      Date_identify,
      Finding_Name,
      Flora_id,
      Village_id,
      District_id,
      Province_id,
      Finding_id,
      Species_id,
      Genus_id,
      Family_id,
    } = req.body;
    const sqlQuery =
      "select image.image_Name, species.Species_Name, genus.Genus_Name, family.Family_Name, flora.Vernacular_Name, flora.note, village.Village_Name, district.District_Name, province.Province_Name, upload.Latitude, upload.Longtitude, upload.Date_identify, finding.Finding_Name from image inner join flora on image.Flora_id = flora.Flora_id inner join upload on upload.Flora_id = flora.Flora_id inner join village on upload.Village_id = village.Village_id inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id inner join finding on flora.Finding_id = finding.Finding_Name inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_Name inner join family on genus.Family_id = family.Family_id";
    const rows = await pool.query(sqlQuery, [
      image_Name,
      Species_Name,
      Genus_Name,
      Family_Name,
      Vernacular_Name,
      note,
      Village_Name,
      District_Name,
      Province_Name,
      Latitude,
      Longtitude,
      Date_identify,
      Finding_Name,
      Flora_id,
      Village_id,
      District_id,
      Province_id,
      Finding_id,
      Species_id,
      Genus_id,
      Family_id,
    ]);
    res.status(200).json({user: rows});
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});
router.post("/", async function (req, res) {
  try {
    const {Flora_id,Village_id,Latitude,Longtitude,Date_identify,User_id,Altitude} = req.body;
    const sqlQuery = "insert into upload(Flora_id,Village_id,Latitude,Longtitude,Date_identify,User_id,Altitude) values(?,?,?,?,?,?,?)";
    const result = await pool.query(sqlQuery, [Flora_id,Village_id,Latitude,Longtitude,Date_identify,User_id,Altitude]);

    res.status(200).json({result });
  } catch (error) {
    res.status(400).send(error);
  }

  // const fid = req.body.Flora_id;
  // const vil = req.body.Village_id;
  // const lat = req.body.Latitude;
  // const long = req.body.Longtitude;
  // const date = req.body.Date_identify;
  // const user = req.body.User_id;
  // const al = req.body.Altitude;

  // pool.query("insert into upload(Flora_id,Village_id,Latitude,Longtitude,Date_identify,User_id,Altitude) values(?,?,?,?,?,?,?)", [fid,vil,lat,long,date,user,al], (err, result) => {
  //   if(err){
  //     res.sendStatus(400).send(err);
  //   }else{
  //     res.sendStatus(200).send(result);
  //   }
  // })

});
//delete, by id
router.delete("/:upload_id", async function (req, res) {
  try {
    const Family_id = req.params.FamilyID;
    const sqlQuery = "delete from family where Family_id=?";
    const result = await pool.query(sqlQuery, Family_id);

    res.status(200).json({ userId: result.Family_id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.delete("/", async function (req, res) {
  try {
    const sqlQuery = "delete from family";
    const result = await pool.query(sqlQuery);

    res.status(200).json({ userId: result });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//update status to be number one 
router.put("/", async function (req, res) {
  try {
    const id = req.body.id;
    const sqlQuery = "update upload set status = 1 where id = ?";
    const result = await pool.query(sqlQuery,  [id]);
  
      res.status(200).json({userId: result.id});
  } catch (error) {
    res.status(400).send(error.message);
  }
});


//put all 
router.put("/Edit/UploadData", async function (req, res) {
  try {
    const id = req.body.id;
    const Flora_id = req.body.Flora_id;
    const User_id = req.body.User_id;
    //    const sqlQuery = "update species set Species_Name = ?, Genus_id=? where Species_id = ?";

    const sqlQuery = "update upload set Flora_id = ?,  User_id=? where id = ?";
    const result = await pool.query(sqlQuery,  [Flora_id,User_id,id]);
  
      res.status(200).json({userId: result.Flora_id});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//select max(id) as getUpload from upload
router.get("/Select/getUploadid", async function (req, res, next) {
  try {
    const sqlQuery = "select max(id) as getUpload from upload";
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows[0].getUpload);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json();
});

module.exports = router;
