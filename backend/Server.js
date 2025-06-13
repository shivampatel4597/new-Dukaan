import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import connect_db from "./config/db_connect.js";
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'

dotenv.config()

const app = express();
app.use(cors({
  origin: ["https://new-dukaan-1.onrender.com", "http://localhost:3000"], 
  credentials: true,
}));

app.use(express.json())

 connect_db()

app.use('/api/auth', authRoute)
app.use('/api/product',productRoute)
app.get('/alert',(req, res)=>{
    res.send("hello world")
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})
