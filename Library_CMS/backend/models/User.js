const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    libraryNo: {
        type: Number,
        required: true
    },
    booksIssued: [
        {
            title: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            },
            issueDate: {
                type: Date,
                required: true
            },
            returnDate: {
                type: Date
            },
            userId: {
                type: mongoose.Schema.ObjectId,
                ref: "Book",
                required: true
            }
        }
    ]
});

module.exports = mongoose.model("Users", userSchema);

