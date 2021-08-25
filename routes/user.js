const pool = require('../Pool');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const checkAuth = require('./verifyToken');
router.use(cookieParser());

router.post('/followreq', checkAuth, async(req,res) =>{
   const sendId = req.body.id;
   const senderId = req.user._id;
   const data = await pool.query('UPDATE users SET friendReq = array_append(friendReq, $1) WHERE id = $2', [senderId, sendId]);
   res.json("sent")
})
router.post('/getfollowreq', checkAuth, async(req,res) =>{
    const id = req.user._id;
    const data = await pool.query('SELECT friendreq FROM users WHERE id = $1', [id]);
    res.json(data.rows[0]) 
 })

 router.post('/acceptFollower', checkAuth, async(req,res) =>{
     const id = req.body.id;
     const data = await pool.query('UPDATE users SET friendReq = array_remove(friendReq, $1), following = array_append(following, $2) WHERE id = $3',[id, id, req.user._id]);
     console.log(data)
    })

module.exports = router;