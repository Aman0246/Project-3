const express = require('express');
const app = express()
const route =  require("./routes/route");
require('dotenv').config()

const mongoose  = require('mongoose');

app.use(express.json())

mongoose.connect(process.env.MONGOCONNECT).then(()=> {
    console.log("MongoDB is Connected")}).catch(() => {console.log("MongoDB not Connected")})
app.use('/',route)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})


