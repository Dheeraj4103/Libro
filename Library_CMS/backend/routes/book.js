const express = require("express");
const { addBook, getAllBooks } = require("../controllers/bookController");
const router = express.Router();


router.post("/add", addBook);
router.get("/get", getAllBooks)

module.exports = router;