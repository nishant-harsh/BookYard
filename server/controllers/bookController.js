const Book = require("../models/Book");

// Get all books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    console.log("getallbooks");
    if (!books || !books[0]) {
      return res.status(404).json({ error: "No Books found." });
    }

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Add a new book
const addBook = async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();

    res
      .status(201)
      .json({ data: newBook, message: "Book added successfully." });
  } catch (error) {
    next(error);
  }
};

// Update book
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, pubYear, availability, genre, bookImage } = req.body;
    console.log(req.body)

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, pubYear, availability, genre, bookImage },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.status(201).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// Update book availability
const bookAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { availability },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.status(201).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// Get book by ID
const getBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// Delete a book
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found." });
    }

    // If the book was reserved, update reservations and set book availability to true
    await Reservation.findByIdAndUpdate(
      { book: id },
      { status: "Rejected" },
      { new: true }
    );

    res.status(410).json({ message: "Book deleted successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBook,
  getAllBooks,
  addBook,
  bookAvailability,
  updateBook,
  deleteBook,
};
