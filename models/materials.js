const mongoose = require('mongoose');
// const path = require('path');

const materialScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: mongoose.Types.Decimal128,
        require: true
    }
},{
    timestamps: true
});

const Material = mongoose.model('Material', materialScehma);

module.exports = Material;