const pool = require('../Pool');
const router = require('express').Router();
const cookieParser = require('cookie-parser')
const checkAuth = require('./verifyToken');
router.use(cookieParser());

router.post('/newpost', checkAuth, async(req,res) =>{
    const {_id} = req.user; 
    const id = _id; 
    console.log(id)
    console.log("getuser");
  
      if(typeof id !== undefined){
      const imageUser = await pool.query("SELECT image FROM users  WHERE id = $1", [id])
      const image = imageUser.rows[0].image;
      const words = req.body.keywords;
      const addWord = words.trim();
     
      const dateObj = new Date();
  
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const seconds = dateObj.getSeconds();
      const minutes = dateObj.getMinutes();
      const hour = dateObj.getHours();
      const currentTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
  
       const user = await pool.query("INSERT INTO posts(userId, image, header, paragraph, keyword, likes, commentby, uploadtime) VALUES($1,$2,$3,$4,$5,$6,$7, $8)",[id, image, req.body.header, req.body.paragraph, addWord, 0,[], currentTime]);
      if(user){
        res.json(true)
      }
      else{
        res.json(false);
      }
      
      }
    })
    
    const getSinglePost = async(id) =>{
      const post = await pool.query(`SELECT * FROM posts WHERE id = $1`, [id]);
      return post.rows[0];
    }
    router.post('/getpost', async(req,res) =>{
     const post = await getSinglePost(req.body.id);
     if(post){
         console.log(post)
         res.json(post);
     }
     else{
         res.json("no post found")
     }
    })
    
    router.post('/getposts', async(req,res) =>{
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
  
    router.post('/likepost', checkAuth,async(req,res) =>{
    //  const data = await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = $1', [req.body.id]);
    //  res.json('updated')
    const userId = req.user._id;
    const postId = req.body.id;
    const data = await pool.query('UPDATE posts SET likes = likes + 1, likedby = array_append(likedby, $1) WHERE id = $2', [userId, postId]);
   const post = await getSinglePost(postId);
     res.json(post)
  })
  
  router.post('/unlikepost', checkAuth,async(req,res) =>{
    //  const data = await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = $1', [req.body.id]);
    //  res.json('updated')
    const userId = req.user._id;
    const postId = req.body.id;
    const data = await pool.query('UPDATE posts SET likes = likes - 1 WHERE id = $1', [ postId]);
    const removeElem = await pool.query('UPDATE posts SET likedby =  array_remove(likedby, $1)  WHERE id = $2', [userId, postId])
   const post = await getSinglePost(postId);
     res.json(post)
  })
  
  
  router.post('/didlike', checkAuth, async(req,res) =>{
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

  router.post('/newcomment', checkAuth, async(req,res) =>{
    const userId = req.user._id;
    const postId = req.body.id;
    const userData = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    const user = await userData.rows[0];
    const newComment = await pool.query('INSERT INTO comment(text, userid, userImg, userName) VALUES($1, $2, $3, $4) RETURNING *', [req.body.comment, userId, user.image,user.name]);
    // if(didLike.rowCount > 0){
    //   res.json(true)
    // }
    // else{
    //   res.json(false);
    // }
    const commentId = newComment.rows[0].id;
    const comment = await pool.query('UPDATE posts SET commentby = array_append(commentby, $1)', [commentId]);
    console.log(comment)
  })
  router.post('/getcomment', checkAuth, async(req,res) =>{
    const commentId = req.body.id;
    const commentAll = await pool.query('SELECT * FROM comment WHERE id = $1', [commentId])
    const comment = commentAll.rows[0];
    if(commentAll.rowCount > 0){
      res.json(comment)
    }
    else{
      res.json("no comments");
    }
  })

  router.post('/deletecomment', checkAuth, async(req,res) =>{
    const commentId = req.body.id;
    const postId = req.body.postId;
    const commentAll = await pool.query('UPDATE posts SET commentby =  array_remove(commentby, $1)  WHERE id = $2', [commentId, postId])
    const comment = commentAll.rows[0];
    if(commentAll.rowCount > 0){
      res.json(comment)
    }
    else{
      res.json("no comments");
    }
  })


  
  module.exports = router;