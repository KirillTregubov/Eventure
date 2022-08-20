console.log("Server Started");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const application = express();
const port = 3000;

const books = [];
application.use(cors());

application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());

application.post("/book", (req, res) => {
  // Will be coding here

  const book = req.body;
  console.log(req.body);
  books.push(book);

  res.send("Book is added to the database");
});

application.get("/", (req, res) => {
  res.send("Hello World");
});

application.get("/books", (req, res) => {
  res.json(books);
});
//configured routes:

// application.get()

application.listen(port, () => console.log(`App listening on port ${port}!`)); // port 3000 in use
