const express = require("express");
const { issueBook, getAllIssuedBooks, removeIssuedBook } = require("../controllers/issuedBooksController");
const router = express.Router();


router.post("/add", issueBook);
router.get("/get", getAllIssuedBooks);
router.delete("/delete", removeIssuedBook);

module.exports = router;