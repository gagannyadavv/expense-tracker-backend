import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true
        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    }
},{timestamps:true})

const categoryModel = mongoose.model("categoryModel",categorySchema)

export {categoryModel}