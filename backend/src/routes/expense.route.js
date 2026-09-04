const express = require("express");
const expenseController = require("../controllers/expense.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.patch("/:expenseId", authMiddleware, expenseController.updateExpense);
router.delete("/:expenseId", authMiddleware, expenseController.deleteExpense);

module.exports = router;