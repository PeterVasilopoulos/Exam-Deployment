const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Note title is required"],
        minLength: [3, "Note title must be longer than 2 characters"]
    },
    body: {
        type: String,
        required: [true, "Note body is required"],
        maxLength: [255, "Note body must be shorter than 255 characters"]
    }
})

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;