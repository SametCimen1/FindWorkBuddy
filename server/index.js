const express = require('express');
const app = express();
require('dotenv').config();

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 
app.get('/', (req,res) =>{
    res.json("hi")
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})