const expenseService = require("../services/expense.service");

async function createExpense(req, res, next){
  try{
    const expense = await expenseService.createExpense(
      req.user_id,
      req.params.tripId,
      req.body
    );

    res.status(200).json({
      success: true,
      data: expense,
    });
  }catch(error){
    next(error);
  }
}

async function getExpenses(req, res, next){
  try{

    const expenses = await expenseService.getExpenses(
      req.user_id,
      req.params.tripId
    );

    res.status(200).json({
      success:true,
      data: expenses,
    })
  }catch(error){
    next(error);
  }
}

async function getBudget(req, res, next){
  try{

    const budget = await expenseService.getBudget(
      req.user_id,
      req.params.tripId
    );

    res.status(200).json({
      success:true,
      data:expense
    })
  }catch(error){
    next(error)
  }
}

async function updateExpense(req, res, next){
  try{
    const expense = await expenseService.updateExpense(
      req.user_id,
      req.params.expenseId,
      req.body
    );

    res.status(200).json({
      success: true,
      data: expense,
    });
  }catch(error){
    next(error);
  }
}

async function deleteExpense(req, res, next){

  try{

    const expense = await expenseService.deleteExpense(
    req.user_id,
    req.params.expenseId
  );

  res.status(200).json({
    success: true,
    data: expense,
  })

  }catch(error){
    next(error);
  }
}
module.exports = {
  createExpense,
  getExpenses,
  getBudget,
  updateExpense,
  deleteExpense,
}