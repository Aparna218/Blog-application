import express from "express";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv"

import connection from "./database/db.js"
dotenv.config()


const app = express()

app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use("/", Router)



const PORT = 5000



app.listen(PORT, ()=>{console.log(` Server is running on PORT ${PORT}` )})
const Username =process.env.DB_USERNAME
const Password = process.env.DB_PASSWORD
connection(Username, Password)