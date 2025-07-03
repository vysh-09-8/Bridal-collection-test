const mongoose=require('mongoose')

const auctionSchema=new mongoose.Schema({
     productId:{type:mongoose.Schema.Types.ObjectId,ref:"bridal_tbl"},
     userId:{type:mongoose.Schema.Types.ObjectId,ref:"user_tbl"},
     auctionAmount:{type:String},
     status:{type:String}
},{timestamps:true})

const auctionModel=new mongoose.model('auction_tbl',auctionSchema)

module.exports=auctionModel