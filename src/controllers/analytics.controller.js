import express from "express";
import { expenseModel } from "../models/expense.model.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import mongoose, { mongo } from "mongoose";
import { categoryModel } from "../models/category.model.js";

async function totalExpenses(req, res){
   try {
     const userId = req.user.id
     const allExpenses = await expenseModel.find({userId}).select("amount")

     if(allExpenses.length === 0){
        return res.status(422).json({
            message:"No expenses found!!"
        })
     }
 
     const result = await expenseModel.aggregate([
         {
             $match:{
                 userId: new mongoose.Types.ObjectId(req.user.id)
             }
         },
         {
             $group:{
                 _id:null,
                 total:{$sum: "$amount"}
             }
         }
     ]);
 
     res.status(200).json({
         message:"Total expense fetched succesfully!!",
         amount:result
     })
   } catch (error) {
    console.log(error);
    res.status(422).json({
        message:"Error while getting sum of expenses!!!"
    })
    
   }



}

async function totalCategoryWiseExpense(req,res){
   try {
     const userId = req.user.id
     const allExpenses = await expenseModel.find({userId}).select("amount categoryId")
 
     if(allExpenses.length ===0){
         return res.status(422).json({
             message:"No expense detected!!"
         })
     }
     const result = await expenseModel.aggregate([
         {
            $match:{
                userId:new mongoose.Types.ObjectId(userId)
            }
         },
         {
             $group:{
                 _id:"$categoryId",
                 total:{$sum:"$amount"}
             }
         },
         {
            $lookup:{
                from:"categorymodels",
                localField:"_id",
                foreignField:"_id",
                as:"category"

            }
         },
         {$unwind:"$category"},
         {
            $project:{
                total:1,
                "category.categoryName":1
            }
         }
     ])
     res.status(200).json({
         message:"Category wise expenses fetched!!",
         result
     })
   } catch (error) {
        console.log(error);
        res.status(422).json({
            message:"Error while fetching Category wise expenses!!"
        })
        process.exit(1)
        
   }
}

async function weeklyAnalysis(req, res) {
    const userId = req.user.id;
  
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
  
    const weeklyData = await expenseModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: last7Days }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
  
    res.json(weeklyData);
}

async function monthlyAnalysis(req, res) {
    const userId = req.user.id;
  
    const monthlyData = await expenseModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" }
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
  
    res.json(monthlyData);
}


export {totalExpenses,totalCategoryWiseExpense,weeklyAnalysis,monthlyAnalysis}