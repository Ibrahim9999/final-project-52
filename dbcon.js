var mysql = require('mysql');

var pool = mysql.createPool(
{
  connectionLimit		: 10,
  host					: 'classmysql.engr.oregonstate.edu',
  user					: 'cs340_mahmoudi',
  password				: '7029',
  database				: 'cs340_mahmoudi',
  multipleStatements	: true
});

module.exports.pool = pool;
