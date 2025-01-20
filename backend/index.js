const express=require('express')
const cors = require('cors');

const app=express()
const bodyParser=require('body-parser')
require('dotenv').config()

const PORT=process.env.PORT||8080
require('./Models/db')
const EmployeeRouter=require('./Routes/EmployeeRoute')
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.send("employee managennt server")
})
app.use(cors());
// middleware 
app.use('/api/employees',EmployeeRouter)
app.listen(PORT,()=>{
    console.log(`server is runnning on ${PORT}`)
})