const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({
      success:false,
      message:"Authentication Required",
    })
  }

  const token = authHeader.split(" ")[1];

  try{
    const decode = jwt.verify(token,process.env.JWT_SECRET)

    req.user_id = decode.user_id;

    next();
  }catch(error){
    return res.status(401).json({
      success:false,
      message:"Invalid or expired token",
    });
  }
}

module.exports = authMiddleware