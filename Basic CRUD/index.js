const express = require('express');
const mongoose = require('mongoose');
const product = require('./models/productModel');
require('dotenv').config();

const app = express();
const port = '3000';

// Listens to the port and process the request
app.listen(port, () => { console.log("Server Started in the Port", port) });
// Middleware to convert the request body into JSON format, so that we can access and process the data
app.use(express.json());

// Mongodb connection
mongoose.connect(process.env.MONGODB_URL)
    .then((res) => console.log("Database Connected Successfully"))
    .catch((e) => { console.log("Database connection failed", e) });

// Gets all the products from the productDetails collection
app.get('/getProducts', async (req, res) => {
    try {
        const response = await product.find({});
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }

})

// Gets the specifc product details from the productDetails collection
app.get('/getProductDetails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await product.findById(id);
        if (!response) {
            return res.status(404).send({ error: "Product is not found" });
        }
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error);

    }
})

// Creates a product in the productDetails collection
app.post('/saveProduct', async (req, res) => {
    try {
        const response = await product.create(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        if (error._message) {
            return res.status(400).send({ error: error.message });
        }
        res.status(500).send(error);
    }
})

// Updates the product in the productDetails collection
app.put('/updateProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await product.findByIdAndUpdate(id, req.body);
        if (!response) {
            return res.status(404).send({ error: "Product is not found" });
        }
        const updatedProduct = await product.findById(id);
        res.status(200).send(updatedProduct);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

// Deletes the product in the productDetails collection
app.delete('/deleteProduct/:id', async (req, res) => {
    try {
        console.log("updateProducts");
        const { id } = req.params;
        const response = await product.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).send({ error: "Product is not found" });
        }
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }
})