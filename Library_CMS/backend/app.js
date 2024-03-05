const express = require("express");
require("dotenv").config();
const connectWithDB = require("./config/db");
const cors = require("cors");
const books = require("./routes/book");
const issuedBooks = require("./routes/issuedBooks")


const app = express();

app.use(express.json());
app.use(cors());

connectWithDB();

app.get("/", (req, res) => {
    res.send("Server is running")
});

app.use("/book", books)
app.use("/issueBook", issuedBooks)



app.listen("5000", () => console.log("Server running on port 5000"));