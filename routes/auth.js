const pool = require('../Pool');
const router = require('express').Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const passport = require('passport');


const signupSchema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    img: Joi.string(),
})


const signinSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
})

router.use(cookieParser());
router.post('/signup', async(req,res) => {

    //validate
    const {error} = signupSchema.validate(req.body);
    if(error){
       return res.status(404).json(error.details[0].message)
    }

    //check if user exist
    const emailExist = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
    if(emailExist.rowCount > 0){
        console.log(emailExist)
        return res.status(404).send("email alreadyyyyyy exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const lowerName = req.body.name.toLowerCase();

    const addUser = await pool.query('INSERT INTO users(name, firstname,lastname, email, password, friends, role, image) VALUES($1, $2, $3, $4,$5, $6, $7, $8)', [lowerName, req.body.firstName, req.body.lastName,req.body.email, hashPassword, [], 'user', req.body.img]);
    try {
        res.send(addUser)
    } catch (error) {
    res.status(400).send(error)
    
}
 
})

router.post('/logout', (req,res) =>{
    res.clearCookie('token').json("logged out")
})

router.post('/signin', async(req,res) =>{
    
    
    const {error} = signinSchema.validate(req.body)
    if(error){
        return res.status(404).send(error.details[0].message)
    }

    const doesExist = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
    if(!(doesExist.rowCount > 0)){
        console.log(doesExist)
        return res.status(404).send("email doesnt existtttttttttt");
    }
    const user = doesExist.rows[0];

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).send("Invalid Password");
    }


    //create jwt token

 
    const token = jwt.sign({_id: user.id}, process.env.TOKENSECRET, {expiresIn: 60*60});

    res.cookie('token', token, { secure: process.env.NODE_ENV !== "development",
    httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); //2hours
    res.header('auth-token', token).send("token set")      

})

router.get('/google', passport.authenticate('google', {scope:['profile']}))

router.get('/auth/callback', passport.authenticate('google', {failureRedirect:'/'}), (req,res) =>{
    console.log('Successfull')
    res.send('SUCCESSFULL')
    res.redirect('/')
})




module.exports = router;
