const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  const {token} = req.cookies;
  if(!token){
    return res.status(401).json('access denied')
  }
  try {
         const verified = jwt.verify(token, process.env.TOKENSECRET);
         req.user = verified;
         next();
  
     } catch (error) {
         res.status(400).send("Invalid Token")
     }

  //  const token = req.header('auth-token');
  //  if(!token){
  //    return  res.status(401).json("access denied");
  //  }
  //  try {
  //      const verified = jwt.verify(token, process.env.TOKENSECRET);
  //      req.user = verified;
  //      next();

  //  } catch (error) {
  //      res.status(400).send("Invalid Token")
  //  }
}
