const jwt = require('jsonwebtoken')
const JWT_secret= "Abhijith"

const fetchUser=(req,res,next)=>{
    const token = req.header("auth-token")
    if(!token){
        res.status(401).send("please authenticate using a valid token")
    }
    const data = jwt.verify(token,JWT_secret)
    req.user = data.user 

    next()
}

module.exports = fetchUser