const express = require("express");
const pool = require("../database");
const router = express.Router();

/* GET users listing. */
router.get("/:Villageid", async function (req, res, next) {
  try {
    const sqlQuery =
      "select Village_id, Village_Name from village where Village_id=?";
    const rows = await pool.query(sqlQuery, req.params.Village_id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ SpeciesID: req.params.SpeciesID });
});

router.get("/", async function (req, res, next) {
  try {
    const {Village_Name,District_Name,Province_Name,District_id,Province_id} = req.body;
    const sqlQuery="select village.Village_id, village.Village_Name, district.District_Name, province.Province_Name from village inner join district on village.District_id = district.District_id inner join province on district.Province_id = province.Province_id  "
    const rows = await pool.query(sqlQuery,Village_Name,District_Name,Province_Name,District_id,Province_id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});
router.get('/getvillage/:id', async function(req, res, next) {
  try {
    const District_id = req.params.id;
    const sqlQuery = 'select Village_id, Village_Name from village where District_id = ?';
    const rows = await pool.query(sqlQuery,[District_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
  res.status(200).json({sqlQuery})
});

router.post("/", async function (req, res) {
  try {
    const {Village_Name,District_id } = req.body;
    const sqlQuery = "insert into village (Village_Name,District_id) values (?,?)";
    const result = await pool.query(sqlQuery, [Village_Name, District_id]);

    res.status(200).json({ userId: result.InsertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//delete, by id
//update, by id

module.exports = router;
