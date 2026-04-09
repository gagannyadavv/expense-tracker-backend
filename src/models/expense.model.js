import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema({
    amount:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categoryModel"
    }
},{timestamps:true})

const expenseModel = mongoose.model("expenseModel",expenseSchema)

export {expenseModel}