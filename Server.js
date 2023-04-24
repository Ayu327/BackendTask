
const express = require("express")
const ejs = require('ejs')
const mongoose = require('mongoose')
require("dotenv").config();

const app = express()
app.use(express.json())


app.set('view engine','ejs')

const finalRoute = require('./routes/route')
app.use("/api/task",finalRoute)


mongoose.connect("mongodb+srv://ayusaini327:gZfK51OpTCTDNwXE@cluster0.nwanwrr.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>{
        console.log("succesfully connected to db")
    }
).catch(
    (err)=>{
        console.log(err)
    }
)

app.listen(4000,()=>{
    console.log("port running on 4000")
})