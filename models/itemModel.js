const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const itemModel = new mongoose.model('Item', itemSchema);

module.exports = itemModel;