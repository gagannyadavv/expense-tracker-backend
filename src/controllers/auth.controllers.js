import express from "express";
import { userModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from "bcryptjs";

async function registerUser(req , res){
    const {name , email , password}   = req.body

    if(!name || !email || !password){
        return res.status(422).json({
            message:"All feilds are required!!"
        })
    }
    
    const isValid = await userModel.findOne({
        $or:[
            {email}
        ]
    })  

    if(isValid){
        res.status(422).json({
            message:"User already exists!!"
        })
    }
    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        name,
        email,
        password:hash
    })


    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET , {expiresIn:"3d"})
    res.cookie("token",token)

    res.status(200).json({
        message:"User created succefully!!",
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        },token
    })

}

async function loginUser(req,res){
    const {email , password} = req.body
    if(!email || !password){
      return res.status(422).json({
            message:"All feilds are required!"
        })
    }

    const user = await userModel.findOne({email})

    if(!user){
        res.status(400).json({
            message:"Email does'nt exists!!"
        })
    }
    const isPasswordCorrect = bcrypt.compare(password,user.password)
    
    if(!isPasswordCorrect){
        return res.status(422).json({
            message:"Incorrect Password!!"
        })
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET , {expiresIn:"3d"})
    res.cookie("token",token)
    res.status(200).json({
        message:"User logged in!!",
        token
    })
}

export {registerUser , loginUser}