const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "said@2460",
  port: 5432,
  database: "authtodo"
});

module.exports = pool;
