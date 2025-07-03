const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'bridal_tbl',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user_tbl',
        required: true
    }
}, {
    timestamps: true
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = Favourite;