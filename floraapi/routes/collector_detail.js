const express = require("express");
const pool = require("../database");
const router = express.Router();

/* GET users listing. */
router.get("/:Collector_id", async function (req, res, next) {
  try {
    const sqlQuery =
      "select Collector_id, Colletor_Name, Collector_Surname,Collector_name,Nationality from collector where Collector_id=?";
    const rows = await pool.query(sqlQuery, req.params.Collector_id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ CollectorID: req.params.Collector_id });
});

router.get("/", async function (req, res, next) {
  try {
    const sqlQuery = "select * from detail_collector";
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.status(200).json({ sqlQuery });
});

router.post("/", async function (req, res) {
  try {
    const {Collector_id,id } = req.body;
    const sqlQuery =
      "insert into detail_collector (Collector_id,id) values (?,?)";
    const result = await pool.query(sqlQuery, [Collector_id,id]);

    res.status(200).json({ userId: result.InsertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
 //delete, by id
 router.delete('/:Collector_id',async function(req,res){
  try {
    const Collector_id = req.params.Collector_id;
    const sqlQuery = 'delete from collector where Collector_id=?';
    const result = await pool.query(sqlQuery,Collector_id)
   
    res.status(200).json({userId: result.Family_id});
    
  } catch (error) {
    res.status(400).send(error.message)
  }
})
router.delete('/',async function(req,res){
  try {
    const sqlQuery = 'delete from collector';
    const result = await pool.query(sqlQuery)
   
    res.status(200).json({userId: result});
    
  } catch (error) {
    res.status(400).send(error.message)
  }
})+
//update, by id
router.put('/', async function(req,res){
  try {
    const {Collector_id,id} = req.body;
    const sqlQuery = 'update collector setCollector_id  = ? id=? where Collector_id = ?';
    const result = await pool.query(sqlQuery,  [Collector_id,id]);

    res.status(200).json({userId: result});
  } catch (error) {
    res.status(400).send(error.message)
  }
})


//get name from upload id
router.get(`/Upload/:id`,async function(req,res){
  try{
    const uid = req.params.id;
    const sqlQuery = 'select collector.Collector_name from detail_collector inner join collector on collector.Collector_id = detail_collector.Collector_id where detail_collector.id = ?';
    const rows = await pool.query(sqlQuery,  [uid]);

    res.status(200).json(rows);
  }catch(err){
    res.status(400).send(err.message)
  }
})

module.exports = router;
