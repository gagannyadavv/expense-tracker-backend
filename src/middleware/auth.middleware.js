import jwt, { decode } from 'jsonwebtoken'

async function authMiddleware(req, res ,next){
    const token = req.cookies.token
    if(!token){
        return res.status(422).json({
            message:"Token missing!!"
        })
    }
    try {
    const decoded = await jwt.verify(token,process.env.JWT_SECRET)
    req.user = {id:decoded.id}  
    } catch (error) {
        return res.status(422).json({
            message:"Invalid token!!"
        })
        
    }
    next()
}


export {authMiddleware}
