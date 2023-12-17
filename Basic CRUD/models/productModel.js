const mongoose = require("mongoose");

// Schema is generated to create the model
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    }
},
    { timestamps: true })

// Creates a model to interact with the DB
const productModel = mongoose.model('productDetails', productSchema);

module.exports = productModel;