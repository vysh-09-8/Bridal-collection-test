const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user_tbl',
        required: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'cart_tbl',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    shippingStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    expectedDate: {
        type: Date,
        required: true
    },
    deliveryAddress:{
        type:String,
        required:true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);