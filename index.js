const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const pool = require('./Pool');
const checkAuth = require('./routes/verifyToken');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const cors = require('cors');
//routes
const authRoute = require('./routes/auth');
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


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
app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());



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
    const user = await pool.query("SELECT (name, image) FROM users WHERE id = $1", [id]);
    console.log("USER")
    console.log(user)
    if(user.rows.length === 0){
      res.status(404).send("cant find user")
    }
    else{
      const informations = user.rows[0];
      console.log(informations)  
      res.json(informations);
    }
  }
  } catch (error) {
     console.log(error)
  }

})


passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:"http://localhost:3000/"
}, async(accessToken, refreshToken, profile, done) =>{
console.log(profile);
}
))
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, user);
});
//google
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', (req, res) => res.send(`Welcome mr !`))

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile'] }));
// app.get('/google',(req,res)=>{
//   console.log(process.env.GOOGLE_CLIENT_SECRET)
// });
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('/good');
  }
);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})