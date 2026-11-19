import jwt from 'jsonwebtoken'
export default (req,res,next)=>{const value=req.headers.authorization?.split(' ')[1];if(!value)return res.status(401).json({message:'Authentication required'});try{req.user=jwt.verify(value,process.env.JWT_SECRET);next()}catch{return res.status(401).json({message:'Invalid session'})}}
