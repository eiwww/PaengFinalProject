const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection({
    host     : 'localhost',
    user     : 'dbflora',
    password : '1234',
    database : 'plantdiversity'
    });
conn.connect(err => {
  if (err) {
    console.log("not connected due to error: " + err);
  } else {
    console.log("connected ! connection id is " + conn.threadId);
  }
});