require('dotenv').config();
const express = require('express')
const app = express()
const cors = require("cors");
const startTheDB = require('./config/db');

app.use(express.json())


// Use CORS middleware
// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true
// }));



//health-check route
app.get("/", (req, res)=>{
    res.send("200 OK")
})

// app.use('/user',userRouter)


app.listen(process.env.PORT, async()=>{
    await startTheDB()
    console.log(`Hello from ${process.env.PORT}`)
})