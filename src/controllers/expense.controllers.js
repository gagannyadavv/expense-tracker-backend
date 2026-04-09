import express from 'express'
import { expenseModel } from '../models/expense.model.js'
import { categoryModel } from '../models/category.model.js'
import { budgetModel } from '../models/budget.model.js'
import { addCategoryController } from './category.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { addBudget } from './budget.controller.js'
import mongoose, { get } from 'mongoose'
async function createExpense(req, res) {
    try {
        const { amount, title, categoryId } = req.body;
        const userId = req.user.id;

        if (!amount || !title || !categoryId) {
            return res.status(422).json({
                message: "All fields are required!!"
            });
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const currentMonth = `${year}-${month}`;

        const category = await categoryModel.findById(categoryId);

        if (!category) {
            return res.status(422).json({
                message: "Category not found!!"
            });
        }

        if (category.userId.toString() !== userId) {
            return res.status(422).json({
                message: "You can access your category only!!"
            });
        }

        const isBudget = await budgetModel.findOne({
            userId,
            categoryId,
            month: currentMonth
        });

        let expense;

        // 👉 NO BUDGET → allow directly
        if (!isBudget) {
            expense = await expenseModel.create({
                amount,
                title,
                userId,
                categoryId
            });

            return res.status(200).json({
                message: "Expense created successfully!!",
                expense
            });
        }

        // 👉 WITH BUDGET → check limit
        const startOfMonth = new Date(year, now.getMonth(), 1);
        const endOfMonth = new Date();

        const totalSpentResult = await expenseModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    categoryId: new mongoose.Types.ObjectId(categoryId),
                    createdAt: {
                        $gte: startOfMonth,
                        $lte: endOfMonth
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const totalSpent = totalSpentResult[0]?.total || 0;
        const finalAmount = totalSpent + amount;

        if (finalAmount <= isBudget.limit) {
            expense = await expenseModel.create({
                amount,
                title,
                userId,
                categoryId
            });

            return res.status(200).json({
                message: "Expense created successfully!!",
                expense
            });
        } else {
            return res.status(422).json({
                message: "Budget exceeded for this category!!"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while creating expense"
        });
    }
}


async function deleteExpense(req,res){
    const expenseId = req.params.Id
    const userId = req.user.id

    const expense = await expenseModel.findById(expenseId)
    if(!expense){
        return res.status(422).json({
            message:"No expense detected!!"
        })
    }

    if(expense.userId.toString() !== userId){
        return res.status(422).json({
            message:"User can only delete its own expenses!!"
        })
    }

    await expenseModel.findOneAndDelete(expenseId)

    res.status(200).json({
        message:"Expense deleted succesfully!!"
    })
    

}

async function getAllExpenses(req,res){
    try {
        const userId = req.user.id;
        const expenses = await expenseModel.find({userId})
        if(!expenses){
            return res.status(422).json({
                message:"No expenses detected!!"
            })
        }
        res.status(200).json({
            message:"All expenses are fetched!!",
            expenses
        })
    } catch (error) {
        res.status(422).json({
            message:"Error while fetching expenses!!"
        })
    }
}




export {createExpense , deleteExpense,getAllExpenses}