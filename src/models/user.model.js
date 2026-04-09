import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i]
    },
    password:{
        type:String,
        required:true,
        
    }
})


const userModel = mongoose.model("userModel",userSchema)

export {userModel}