const Book = require("../models/Book");


exports.addBook = async (req, res, next) => {
    const {
        title,
        authors,
        description,
        issued,
        location
    } = req.body;

    const book = await Book.create({
        title,
        authors,
        description,
        issued,
        location
    });

    res.status(200).json({
        success: true,
        book
    });
}

exports.deleteBook = async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new Error("Book doesn't exist!!"));
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Book Deleted Successfully..."
    })
}

exports.getAllBooks = async (req, res, next) => {
    const books = await Book.find({});

    res.status(200).json({
        success: true,
        books
    });
}