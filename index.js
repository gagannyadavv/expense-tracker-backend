import express from "express";
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
    path:'./.env'
})
import { app } from "./src/app.js";
import { connectDb } from "./src/database/db.js";

connectDb()


app.listen(3000,()=>{
    console.log("App is listening on 3000");
    
})
