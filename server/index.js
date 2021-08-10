const express = require('express');
const app = express();
require('dotenv').config();
const {auth} = require('express-openid-connect');

// app.use(
//     auth({
//         authRequired: false,
//         auth0Logout: true,
//         secret: process.env.SECRET,
//         baseURL: process.env.BASEURL,
//         clientID: process.env.CLIENTID,
//         issuerBaseURL: process.env.ISSERBASEURL
//     })
// )

app.get('/', (req,res) =>{
//    res.send(req.oidc.isAuthenticated() ? "logged in" : "logged out")
console.log(process.env.SECRET)
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})