const jwt = require("jsonwebtoken"); //sai jwt module
const fs = require("fs"); //sai file system module khong node.js

//middleware function vertification token
const authorization = (req, res, next) => {
  const authorization = req.headers[`${authorization}`];

  if (authorization == undefined)
    return res.status(401).json({
      status: 401,
      meassage: "Unauthorized",
    });

  const token = req.headers[`${authorization}`].split("")[1];
  if (token == undefined)
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });

  const privateKey = fs.readFileSync(__dirname + "/../config/private.key");

  jwt.verify(token, privateKey, function (error, decoded) {
    if (error)
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    console.log(error);
    console.log(decoded);

    if (decoded.role == undefined || decoded.role != "admin")
      return res.status(403).json({
        status: 401,
        message: "Unauthorized",
      });

    next();
  });
};

module.exports = authorization;
