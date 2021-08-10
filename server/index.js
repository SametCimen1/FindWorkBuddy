const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const pool = require('./Pool');
require('dotenv').config();
app.use(express.urlencoded({extended: false}))




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}) 
app.use(bodyParser.json())

app.get('/', (req,res) =>{
    res.send("hi")
})

app.post('/signup', async(req,res) =>{
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(await pool.query("SELECT * FROM users"));

  } catch (error) {
      console.log(error.message)
  }
     
})
app.post('/signin', (req,res) =>{
  
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})