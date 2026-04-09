import {budgetModel} from '../models/budget.model.js'
import {authMiddleware} from '../middleware/auth.middleware.js'
import {categoryModel} from '../models/category.model.js'

async function addBudget(req,res){
try {
        const userId = req.user.id
        const {categoryId , limit} = req.body
        if(!userId){
            return res.status(422).json({
                message:"User not found!!"
            })
        }
        if(!categoryId || limit === undefined){
            return res.status(422).json({
                message:"All feilds are required!!"
            })
        }
        if(typeof limit !== "number"){
            return res.status(422).json({
                message:"Add budget in number !!"
            })
        }
        const now = new Date();
    
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
    
        const currentMonth = `${year}-${month}`;
        
        const category = await categoryModel.findById(categoryId)
        if(category.length === 0){
            return res.status(422).json({
                message:"Category does'ne exist!!"
            })
        }
        if(category.userId.toString() !== userId){
            return res.status(422).json({
                message:"You can access your category only!!"
            })
        }
        
        const existing = await budgetModel.findOne({
            userId,
            categoryId,
            month:currentMonth
        })
        if(existing){
            existing.limit = limit
            return res.status(422).json({
                message:"Limit updated!!"
            })
        }
        const categoryBudget = await budgetModel.create({
            limit,
            userId,
            categoryId,
            month:currentMonth
        })
        res.status(200).json({
            message:"Budget set succesfully!!"
        }) 
} catch (error) {
    console.log(error);
    res.status(422).json({
        message:"error while setting up the budget!!"
    })
    
}

}


export {addBudget}