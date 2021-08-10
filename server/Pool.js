const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    password:"Samet123",
    host:"localhost",
    port:5432,
    database:"findworkbuddy"
})

module.exports = pool;