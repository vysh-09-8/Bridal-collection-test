const mongoose=require('mongoose')

const contactSchema=new mongoose.Schema({
    Name:{type:String},
    Email:{type:String},
    Message:{type:String}
},{timestamps:true})

const contactModel=new mongoose.model('contact_tbl',contactSchema)
module.exports=contactModel