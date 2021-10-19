const express = require("express");
const router = express.Router();
const pool = require("../database");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/paper/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  fileFilter: fileFilter,
});

router.post("/", upload.single("pdf"), (req, res, next) => {
  try {
    const { Paper_Name, Description } = req.body;
    const pdf = req.file.path;

    pool
      .query("insert into paper (Paper_Name,pdf,Description) values(?,?,?)", [
        Paper_Name,
        pdf,
        Description,
      ])
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
}),
  router.put("/", upload.single("pdf"), (req, res, next) => {
    try {
      const { Paper_id, Paper_Name, Description } = req.body;
      const pdf = req.file.path;

      pool
        .query(
          "update paper set Paper_Name = ?, pdf =?, Description=? where Paper_id = ? ",
          [Paper_Name, pdf, Description, Paper_id]
        )
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }),
  router.get("/", async function (req, res, next) {
    try {
      const sqlQuery = "select * from paper";
      const rows = await pool.query(sqlQuery);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message);
    }
    res.status(200).json({ sqlQuery });
  });
  //select * from paper where Paper_id =?
  router.get('/getPaperid/:id', async function(req, res, next) {
    try {
      const Paper_id = req.params.id;
      const pdf = req.body;
      const sqlQuery="select * from paper where Paper_id =?"
      const rows = await pool.query(sqlQuery,[Paper_id,pdf]);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message)
    }
    res.status(200).json({sqlQuery})
  });
module.exports = router;
