import mongoose from 'mongoose';
import {ENV_VARS } from './envVars.js';

export const connectDB = async () => {

    try{
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("Mongodb came through and I am in!!!!!!!");
        

    }catch(error){
        console.error("mongodb is a bum and won't connect")
        process.exit(1);
        

        
    }

}