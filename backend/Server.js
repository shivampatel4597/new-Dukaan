import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json())


app.get('/alert',(req, res)=>{
    res.json({message:"this is an alert message from backend "})
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})
