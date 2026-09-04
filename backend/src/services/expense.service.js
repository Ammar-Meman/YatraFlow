const Expense = require("../models/Expense");
const Trip = require("../models/Trip");

async function createExpense(userId, tripId, expenseData){
  
  const trip = await Trip.findOne({
    _id: tripId,
    userId,
  });

  if(!trip){
    const error = new Error("Trip not found");
    error.statusCode = 404;
    throw error;
  }

  const expense = await Expense.create({
    tripId,
    ...expenseData
  });

  return expense;
}

async function getExpenses(userId, tripId){
  
  const trip = await Trip.findOne({
    _id: tripId,
    userId,
  })

  if(!trip){
    const error = new Error("Trip not found");
    error.statusCode = 404;
    throw error;
  }

  const expenses = await Expense.find({
    tripId
  });

  return expenses;
}

async function getBudget(userId, tripId){

    const trip = await Trip.findOne({
        _id: tripId,
        userId,
    })

    if(!trip){
        const error = new Error("Trip not found");
        error.statusCode = 404;
        throw error;
    }

    const expenses = await Expense.find({
        tripId,
    })

    const totalSpent = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const remaining = trip.budget - totalSpent;

    return {
        budget: trip.budget,
        totalSpent,
        remaining,
    }
}

const updateExpense = async(userId, expenseId, expenseData)=>{

  const expense = await Expense.findById(expenseId);

  if(!expense){
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  const trip = await Trip.findOne({
    _id: expense.tripId,
    userId,
  })

  if(!trip){
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  Object.assign(expense,expenseData);

  await expense.save();

  return expense;
}

const deleteExpense = async(userId, expenseId) => {

  const expense = await Expense.findById(expenseId);

  if(!expense){
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  const trip = await Trip.findOne({
    _id: expense.tripId,
    userId,
  });

  if(!trip){
    const error = new Error("Trip not found");
    error.statusCode = 404;4
    throw error;
  }

  await Expense.findByIdAndDelete(expenseId);

  return expense;
}
module.exports = {
  createExpense,
  getExpenses,
  getBudget,
  updateExpense,
  deleteExpense,
}