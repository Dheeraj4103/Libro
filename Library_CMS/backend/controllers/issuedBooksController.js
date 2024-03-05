const IssuedBooks = require("../models/IssuedBooks");
const Book = require("../models/Book");


exports.issueBook = async (req, res, next) => {
    const {
        title,
        bookId,
        studentCRN,
        studentLibraryNumber,
        returnDate
    } = req.body;

    const book = await Book.findById(bookId);

    // console.log(book);
    
    
    let issuers = book.issuers;
    issuers.push(studentCRN);
    console.log(issuers);


    const issuedBook = await IssuedBooks.create({
        title,
        bookId,
        studentCRN,
        studentLibraryNumber,
        returnDate
    });
    await Book.findByIdAndUpdate(bookId, { issued: true, issuers: issuers });
    

    res.status(200).json({
        success: true,
        issuedBook
    });
};

exports.getAllIssuedBooks = async (req, res, next) => {
    const issuedBooks = await IssuedBooks.find({});

    res.status(200).json({
        success: true,
        issuedBooks
    });
}

exports.removeIssuedBook = async (req, res, next) => {
    const { bookId, studentCRN } = req.body;

    const issuedBook = await IssuedBooks.findById(bookId);

    if (!issuedBook) {
        return next(new Error("Book not found"));
    }


    await Book.findByIdAndUpdate(issuedBook.bookId, { issued: false });

    await IssuedBooks.findByIdAndDelete(bookId);

    res.status(200).json({
        success: true,
        message: "Book is Unissued"
    });
};