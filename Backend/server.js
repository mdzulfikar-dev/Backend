import dotenv from "dotenv"

import app from "./src/app.js"
import connectToDB from "./src/config/database.config.js"
dotenv.config()
connectToDB()
app.listen(3000,()=>{
    console.log("server running on port 3000")
})