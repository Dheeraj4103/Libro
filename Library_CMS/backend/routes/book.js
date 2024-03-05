const express = require("express");
const { addBook } = require("../controllers/bookController");
const router = express.Router();


router.post("/add", addBook);

module.exports = router;