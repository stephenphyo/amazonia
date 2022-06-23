const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    orderItems: { type: Array, required: true},
    shippingAddress: {
        fullName: { type: String, required: true },
        address1: { type: String, required: true },
        address2: { type: String },
        city: { type: String, required: true },
        postal: { type: String, required: true },
        country: { type: String, required: true },
        mobile: { type: String, required: true },
    },
    paymentMethod: { type: String, requried: true },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    subtotal: { type: Number, required: true },
    shippingFees: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    PaidAt: { type: Date }
},
{
    timestamps: true
});

module.exports = mongoose.model('order', ordersSchema);