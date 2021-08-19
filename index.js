const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const pool = require('./Pool');
const checkAuth = require('./routes/verifyToken');
const cookieParser = require('cookie-parser')
const cors = require('cors');
//routes
const authRoute = require('./routes/auth');


const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions))


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

app.post('/userexist', (req,res) =>{
  const {token} = req.cookies;
  if(token){
    res.json(true)
  }
  else{
   res.json(false); 
  }
})
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





app.post('/getuser',checkAuth, async(req,res) =>{
  const {id} = req.body;  
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
      const informations = {name:row.name, emial:row.email, friendnum:row.friendnum, role:row.role, image:row.image};
      res.json(informations);
    }
  }
  } catch (error) {
     console.log(error)
  }

})

app.post('/newpost', checkAuth, async(req,res) =>{
  const {_id} = req.user; 
  const id = _id; 
  console.log(id)
  console.log("getuser");

    if(typeof id !== undefined){
    const imageUser = await pool.query("SELECT image FROM users  WHERE id = $1", [id])
    const image = imageUser.rows[0].image;
    const words = req.body.keywords;
    const addWord = words.trim();

    console.log(words)
     const user = await pool.query("INSERT INTO posts(userId, image, header, paragraph, keyword, likes, reply) VALUES($1,$2,$3,$4,$5,$6,$7)",[id, image, req.body.header, req.body.paragraph, addWord, 0,[]]);
    if(user){
      res.json(true)
    }
    else{
      res.json(false);
    }
    
    }
  })

  app.post('/getposts', async(req,res) =>{
    const subject = req.body.subject;
    const sort = req.body.sort;
    if(subject === ''){
        if(sort === ''){
          console.log("BOTH EMPTY")
          const posts =await pool.query("SELECT * FROM posts ORDER BY id ASC  LIMIT 50"); //SAVE the last id and fetch from there on click next
          res.json(posts.rows);
        }
        else if(sort === 'date'){
          console.log("subject empty date")
          const posts =await pool.query(`SELECT * FROM posts  ORDER BY id DESC`); //SAVE the last id and fetch from there on click next
          res.json(posts.rows);
        }
        else if(sort === 'populer'){
          console.log("subject empty populer")
          const posts =await pool.query(`SELECT * FROM posts  ORDER BY likes DESC`); //SAVE the last id and fetch from there on click next
          res.json(posts.rows);
        }
    }
    else if(subject !== ''){
   
      const modSubject =  "'"+subject+"'";
      if(sort === ''){
        console.log("subject not sort empty")
        const posts =await pool.query(`SELECT * FROM posts WHERE keyword = ${modSubject}`); //SAVE the last id and fetch from there on click next
      res.json(posts.rows);
      }
      else if(sort === 'date'){
        console.log("subject not sort date")
        const posts =await pool.query(`SELECT * FROM posts WHERE keyword = ${modSubject} ORDER BY id`); //SAVE the last id and fetch from there on click next
        res.json(posts.rows);
      }
      else if(sort === 'populer'){
        
        //sort by likes
      }
    }
  })

app.post('/likepost', checkAuth,async(req,res) =>{
  //  const data = await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = $1', [req.body.id]);
  //  res.json('updated')
  const userId = req.user._id;
  const postId = req.body.id;
  const data = await pool.query('UPDATE posts SET likedby = array_append(likedby, $1) WHERE id = $2', [userId, postId]);
   res.json('updated')
})

app.post('/didlike', checkAuth, async(req,res) =>{
  const userId = req.user._id;
  const postId = req.body.id
  const didLike = await pool.query('SELECT * FROM posts WHERE  id = $1 AND  $2 = ANY (likedby) ', [postId, userId])
  if(didLike.rowCount > 0){
    res.json(true)
  }
  else{
    res.json(false);
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})