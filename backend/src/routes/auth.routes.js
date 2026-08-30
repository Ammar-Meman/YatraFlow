const express = require("express");
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login",authController.login)

router.get("/protected",authMiddleware, (req,res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated",
    user_id: req.user_id,
  })
})

module.exports = router;