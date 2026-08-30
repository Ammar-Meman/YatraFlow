const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signup = async ({ name, email, password }) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  const token = jwt.sign(
    { user_id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  )

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      photoUrl: user.profileImage,
      language: "en",
    },
  }
};

const login = async ({email, password}) => {
  const user = await User.findOne({email}).select("+passwordHash");

  if(!user){
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.passwordHash
  )

  if(!passwordMatch){
    const error = new Error("Invalid email or password")
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {user_id: user._id},
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d"
    }
  )

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      photoUrl: user.profileImage,
      language: "en",
    }
  }
}

module.exports = {
  signup,
  login,
}