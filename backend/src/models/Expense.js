const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    category: {
      type: String,
      enum: ["Stay", "Food", "Transport", "Activities", "Other"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    date:{
      type: Date,
      required: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Expense", expenseSchema);