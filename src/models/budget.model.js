import mongoose, { mongo, Schema }  from "mongoose";

const budgetSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CategoryModel",
        required:true
    },
    month:{
        type:String,
        match:/^\d{4}-(0[1-9]|1[0-2])$/,
        required:true
        
    },
    limit:{
        type:Number,
        required:true
    }
})


const budgetModel = mongoose.model("budgetModel",budgetSchema)

export {budgetModel}