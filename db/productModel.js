const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({

})

//work in progress,still have to determine the structure of schema for products



module.exports = mongoose.model.Products || mongoose.model("Products", ProductSchema);