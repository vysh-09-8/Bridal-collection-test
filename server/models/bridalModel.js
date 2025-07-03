const mongoose=require('mongoose')



const bridalSchema = new mongoose.Schema({
    religion: { type: String, required: true },
    occassion: { type: String, required: true },
    images: { type: [String] }, 
    gender: { type: String, required: true },
    price:{type:String,required:true},
    auctionAmount:{type:String,required:true},
    description: [
        {
            print: { type: String },
            color: { type: String },
            product: { type: String },
            fabric: { type: String },
            features: { type: String },
            fit: { type: String },
            styling: { type: String },
            countryorigin: { type: String },
            manufacturer: { type: String },
        },
    ],
},{timestamps:true});

const bridalModel = mongoose.model('bridal_tbl', bridalSchema);


module.exports=bridalModel;