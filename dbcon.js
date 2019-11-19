var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_mahmoudi',
  password        : '7029',
  database        : 'cs340_mahmoudi'
});

module.exports.pool = pool;
