const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const pool = require('./Pool');
const checkAuth = require('./routes/verifyToken');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const jwt = require('jsonwebtoken');
//routes

const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const fileUpload = require('express-fileupload');
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(fileUpload());

require('dotenv').config();
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}) 


app.use('/api/user', authRoute);

app.post('/userexist', async(req,res) =>{
  const {token} = req.cookies;
  if(token === ''){
    res.json(false); 
  }
  else{
    const verified = jwt.verify(token, process.env.TOKENSECRET);
    console.log("VERIFIED")
    console.log(verified)
    try {
      const data = await pool.query('SELECT * FROM users WHERE id = $1', [verified._id]);
      const user = await data.rows[0];
      if(user){
        res.json(true);
      }  
    } catch (error) {
      res.clearCookie('token').json("logged out")
      res.json(false); 
    }
  }

})
app.use('/post', postRoute);  
app.post('/admin', checkAuth, async(req,res,next) =>{
 
  const {_id} = req.user;
  console.log(_id)
  try {
    const isAdmin =await pool.query('SELECT * FROM users WHERE id = $1' ,[_id]);
    const user = await  isAdmin.rows[0];
    if(user.role === 'admin'){
        res.json(true);
    }
    else{
      res.json(false);
    }
  } catch (error) {
    console.log(error)
    res.status(401).send("Unauthorized")
  }
  
})
app.get('/sample', checkAuth, async(req,res,next) =>{
  const data = await pool.query("SELECT * FROM users");
  console.log(data)
})



app.post('/getbyid', checkAuth, async(req,res) =>{
  const id = req.body.id;
  const myId = req.user._id;
  try {
    const data = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = data.rows[0];
    const informations = {name:user.name, friendnum:user.friendnum, image:user.image, role:user.role};
    console.log("GET BY ID")
    const intId = parseInt(id)
    if(user.followers.length === 0 && intId !== myId){
      res.json({"friend":false, user:informations})  
    }
    else if(user.followers.some(id => id === myId) || intId === myId){
      res.json({"friend":true, user:informations})
    }
    else{
      res.json({"friend":false, user:informations})  
    }
  } catch (error) {
    
  }
})

app.post('/getuser',checkAuth, async(req,res) =>{
  const id = req.user._id;
  console.log(id)
  console.log("getuser");
  try {
    if(typeof id !== undefined){
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    console.log("USER")
    console.log(user)
    if(user.rows.length === 0){
      res.status(404).send("cant find user")
    }
    else{
      const row = user.rows[0];
      const informations = {id:id,name:row.name, emial:row.email, friendnum:row.friendnum, role:row.role, image:row.image};
      res.json(informations);
    }
  }
  } catch (error) {
     console.log(error)
  }

})
app.post('/uploadimg', checkAuth, async(req,res) =>{
 
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  let random = "";
  for(let i = 0; i<10; i++){
    random += alphabet[Math.floor(Math.random() * 26)]
  } 
  const newimg = req.files.newimg;
  console.log(newimg)
  const data = await pool.query('UPDATE users SET test = $1 WHERE id = $2', [ newimg.data,req.user._id])
  console.log(data)
  // newimg.mv('./userImages/' +random+ newimg.name);
  // res.send("uploaded")
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})