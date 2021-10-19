const express = require("express");
const pool = require("../database");
const router = express.Router();

/* GET users listing. */
router.get("/:Flora_id", async function (req, res, next) {
  try {
    const sqlQuery =
      "select Flora_id, Vernacular_Name from flora where Flora_id=?";
    const rows = await pool.query(sqlQuery, req.params.Flora_id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ SpeciesID: req.params.SpeciesID });
});

router.get("/", async function (req, res, next) {
  try {
    const {Flora_id,Species_Name,Genus_Name,Family_Name,Verncular_Name,note,Finding_Name,Create_date,Species_id,Genus_id,Family_id,Finding_id} = req.body;
    const sqlQuery="select flora.Flora_id, species.Species_Name, genus.Genus_Name, family.Family_Name, flora.Vernacular_Name, flora.note, finding.Finding_Name, flora.Create_date from flora inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id  inner join family on genus.Family_id = family.Family_id inner join finding on flora.Finding_id = finding.Finding_id"
    const rows = await pool.query(sqlQuery,Flora_id,Species_Name,Genus_Name,Family_Name,Verncular_Name,note,Finding_Name,Create_date,Species_id,Genus_id,Family_id,Finding_id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});

router.get("/getFloraid/:id", async function (req, res, next) {
  try {
    const Flora_id = req.params.id;
    const {Species_Name,Genus_Name,Family_Name,Vernacular_Name,note,Finding_Name,Create_date,Species_id,Genus_id,Family_id,Finding_id} = req.body;
    const sqlQuery="select flora.Flora_id, species.Species_Name, genus.Genus_Name, family.Family_Name, flora.Vernacular_Name, flora.note, finding.Finding_Name, flora.Create_date from flora inner join species on flora.Species_id = species.Species_id inner join genus on species.Genus_id = genus.Genus_id  inner join family on genus.Family_id = family.Family_id inner join finding on flora.Finding_id = finding.Finding_id where Flora_id =?"
    const rows = await pool.query(sqlQuery,[Flora_id,Species_Name,Genus_Name,Family_Name,Vernacular_Name,note,Finding_Name,Create_date,Species_id,Genus_id,Family_id,Finding_id]);
    res.status(200).json( rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});

router.post("/", async function (req, res) {
  try {
    const {Species_id,Vernacular_Name,note,Finding_id } = req.body;
    const sqlQuery = "insert into flora (Species_id,Vernacular_Name,note,Finding_id) values (?,?,?,?)";
    const result = await pool.query(sqlQuery, [Species_id,Vernacular_Name,note,Finding_id]);

    res.status(200).json({ userId: result.InsertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//select Flora id Max
router.get("/Select/getFlora", async function (req, res, next) {
  try {
    const sqlQuery = "select max(Flora_id) as getFloraid from flora";
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows[0].getFloraid);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json();
});
//delete, by id
//update, by id

module.exports = router;
