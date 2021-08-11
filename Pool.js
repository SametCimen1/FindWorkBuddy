const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();




const pool = new Pool({
    user:process.env.DBUSERNAME,
    password:process.env.DBPASSWORD,
    host:"localhost",
    port:5432,
    database:"findworkbuddy"
})

module.exports = pool;