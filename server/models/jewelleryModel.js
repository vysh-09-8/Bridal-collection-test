const mongoose=require('mongoose')


const jewellerySchema=new mongoose.Schema({
    name: { type: String, required: true },
    images: { type: [String] }, // Array of strings (image URLs or paths)
    price:{type:String,require:true},
    gender: { type: String, required: true },
    color:{type:String,require:true},
    pieces:{type:String,require:true},
     weight:{type:String,require:true},
     fit:{type:String,require:true}
},{timestamps:true})


const jewelleryModel=new mongoose.model("jewellery_tbl",jewellerySchema)

module.exports=jewelleryModel