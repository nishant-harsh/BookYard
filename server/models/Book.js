const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pubYear: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  genre: { type: String },
  bookImage: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
