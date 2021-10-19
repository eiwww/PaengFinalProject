const Family = require("../models/family.model");

exports.findAll =  function (req, res) {
  Family.findAll(function (err, family) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", family);
    res.send(family);
  });
};

exports.create = function (req, res) {
  const new_family = new Family(req.body);
  //handle null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all require field" });
  } else {
    Family.create(new_family, function (err, family) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Family added sucessfully!",
        data: family,
      });
    });
  }
};

exports.findById = function (req, res) {
  Family.findById(req.params.Family_id, function (err, family) {
    if (err) res.send(err);
    res.json(family);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please Provide all require field" });
  } else {
    Family.update(
      req.params.Family_id,
      new Family(req.body),
      function (err, family) {
        if (err) res.send(err);

        res.json({ error: false, message: "Family succesfully updated" });
      }
    );
  }
};

exports.delete = function (req, res) {
  Family.delete(req.params.Family_id, function (err, family) {
    if (err) res.send(err);
    res.json({ error: false, message: "Family successfully deleted" });
  });
};
