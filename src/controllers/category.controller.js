import express from "express";
import {categoryModel} from '../models/category.model.js'
import { authMiddleware } from "../middleware/auth.middleware.js";

async function addCategoryController(req, res){
 try {
       const {categoryName} = req.body
       const userId = req.user.id
   
       if(!categoryName){
           return res.status(422).json({
               message:"Category name required!!"
           })
       }
       const categoryDuplicateCheck = await categoryModel.findOne({categoryName,userId})
       if(categoryDuplicateCheck){
        return res.status(422).json({
            message:"category already exists!!"
        })
       }
       const category = await categoryModel.create({
           categoryName,
           userId
       })
       res.status(200).json({
           message:"Category created succesfully!!",
           category
       })
 } catch (error) {
    console.log(error);
    res.status(422).json({
        message:"Error while creating category!!"
    })
    process.exit(1)
    
 }

}   

async function getAllCategory(req, res){
   try {
     const userId = req.user.id
 
     const allCategories = await categoryModel.find({userId})
     if(!allCategories){
         return res.status(200).json({
             message:"No categories found!!"
         })
     }
     res.status(200).json({
         message:"Categories fetched succesfully!!",
         allCategories
     })
   } catch (error) {
        console.log(error);
        res.status(422).json({
            message:"Error while getting all categories!!"
        })
        process.exit(1)
        
   }
}

async function deleteCategory(req,res){
    const categoryId = req.params.id
    const userId = req.user.id
    if(!categoryId){
        return res.status(422).json({
            message:"Id of category is required!!"
        })
    }
    const categories = await categoryModel.findById(categoryId)
    if(!categories){
        return res.status(422).json({
            message:"Category does'nt exists!!"
        })
    }
    if(!categories.userId.toString() === userId){
        return res.status(422).json({
            message:"You can only delete your own's category!!"
        })
    }
    await categoryModel.findByIdAndDelete(categoryId)
    res.status(200).json({
        message:"Category deleted succesfully!!"
    })

}

export {addCategoryController,getAllCategory,deleteCategory}