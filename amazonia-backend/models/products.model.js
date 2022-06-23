const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        "id": { type: String, required: true, unique: true },
        "name": { type: String, required: true },
        "brand": { type: String, required: true },
        "description": { type: String, required: true },
        "category": { type: String, required: true },
        "subCategory": { type: String, required: true },
        "price": { type: Number, required: true },
        "orgPrice": { type: Number, required: true },
        "inStock": { type: Number, required: true },
        "rating": { type: Number, required: true },
        "reviews": { type: Number, required: true },
        "coverImage": { type: String, required: true },
        "smallImages": [{ type: String }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);