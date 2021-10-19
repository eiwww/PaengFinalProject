const express = require("express");
const pool = require("../database");
const router = express.Router();

/* GET users listing. */
router.get("/:Species_id", async function (req, res, next) {
  try {
    const sqlQuery =
      "select Species_id, Species_Name from species where Species_id=?";
    const rows = await pool.query(sqlQuery, req.params.Species_id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ SpeciesID: req.params.SpeciesID });
});

router.get("/", async function (req, res, next) {
  try {
    //const sqlQuery = "select * from species";
    const {Species_id,Species_Name,Genus_Name,Family_Name,Genus_id,Family_id} = req.body;
    const sqlQuery="select species.Species_id, species.Species_Name, genus.Genus_Name, family.Family_Name from species inner join genus on species.Genus_id = genus.Genus_id inner join family on genus.Family_id = family.Family_id  "
    const rows = await pool.query(sqlQuery,Species_id,Species_Name,Genus_Name,Family_Name,Genus_id,Family_id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});
router.get('/getspecies/:id', async function(req, res, next) {
  try {
    const Genus_id = req.params.id;
    const sqlQuery = 'select Species_id, Species_Name from species where Genus_id = ?';
    const rows = await pool.query(sqlQuery,[Genus_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
  res.status(200).json({sqlQuery})
});
router.post("/", async function (req, res) {
  try {
    
    const {Species_Name,Genus_id } = req.body;
//     const checkSpeciesName = 'select Species_Name from species where Species_Name=?'
//     const checkrows = await pool.query(checkSpeciesName,Species_Name);
//     if(checkrows.length>=1){
// return res.status(409).json({
// message: "species name exists"
// })
//     }
    const sqlQuery = "insert into species (Species_Name,Genus_id) values (?,?)";
    const result = await pool.query(sqlQuery, [Species_Name, Genus_id]);

    res.status(200).json({ userId: result.InsertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//delete, by id
//update, by id
router.put("/", async function (req, res) {
  try {
    const {Species_Name,Genus_id,Species_id } = req.body;
    const sqlQuery = "update species set Species_Name = ?, Genus_id=? where Species_id = ?";
    const result = await pool.query(sqlQuery, [Species_Name, Genus_id,Species_id]);

    res.status(200).json({ userId: result.InsertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
