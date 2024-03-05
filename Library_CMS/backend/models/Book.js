const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    issued: {
        type: String,
        required: true
    },
    copies: {
        type: Number,
    },
    barcode: {
        type: Number
    },
    location: {
        type: String,
        required: true
    },
    issuers: []
});

module.exports = mongoose.model("Books", bookSchema);

