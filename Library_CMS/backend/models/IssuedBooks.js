const mongoose = require("mongoose");

const issuedBooksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    bookId: {
        type: mongoose.Schema.ObjectId,
        ref: "Books",
        required: true
    },
    studentCRN: {
        type: Number,
        required: true
    },
    studentLibraryNumber: {
        type: Number,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("IssuedBooks", issuedBooksSchema);

