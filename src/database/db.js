import mongoose from "mongoose";

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected succesfully!!");
        

    } catch (error) {
        console.log(error);
        console.log("Error while connecting to db!!");
        process.exit(1)
        
        
    }
}

export {connectDb}