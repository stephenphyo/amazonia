const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema(
    {
        "userid": { type: String, required: true },
        "cartItems": { type: Array, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Carts', cartsSchema);