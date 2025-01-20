const mongoose=require('mongoose')

const Schema=mongoose.Schema
const EmployeeShema=new Schema({
     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     phone:{
        type:String,
        required:true
     },
     department:{
        type:String,
        required:true
     },
     profileImage:{
        type:String,
        // required:true
       
     },
     salary:{
        type:String,
        required:true
     },
     createdAt:{
        type:Date,
        // required:true
        default:new Date()
     },
     updatedAt:{
        type:Date,
        // required:true
        default:new Date()
     }
})

const EmployeeModel=mongoose.model('employees',EmployeeShema)
module.exports=EmployeeModel