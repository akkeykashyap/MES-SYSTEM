const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    location: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
