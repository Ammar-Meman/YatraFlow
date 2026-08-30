const authService = require("../services/auth.service");

const signup = async (req, res, next) => {
  try{
    const user = await authService.signup(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  }catch (error){
    next(error)
  }
};

const login = async (req,res,next) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  }catch(error){
    next(error);
  }
}

module.exports = {
  signup,
  login,
}