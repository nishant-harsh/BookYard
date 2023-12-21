const Book = require("../models/Book");
const Reservation = require("../models/Reservation");

// Get all reservations for all user
const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find()
      .populate({ path: "book", select: "title" })
      .populate({ path: "user", select: "name" })
      .sort([["date", -1]]); // sort by date in descending order

    if (!reservations || !reservations[0]) {
      return res.status(404).json({ message: "No reservations found" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

// Get User reservations
const getUserReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({
      user: req.user._id,
    })
      .populate({ path: "book", select: "title" })
      .populate({ path: "user", select: "name" })
      .sort([["date", -1]]); // sort by date in descending order

    if (!reservations || !reservations[0]) {
      return res.status(404).json({ message: "No reservations found." });
    }

    return res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

// Reserve a book
const reserveBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    if (!book.availability) {
      return res
        .status(400)
        .json({ error: "Book is not available for reservation." });
    }

    const reservation = new Reservation({ user: req.user._id, book: bookId });

    await reservation.save();

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

// Update reservations status
const reservationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id);
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    const bookId = reservation.book._id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    if (!book.availability) {
      return res
        .status(400)
        .json({ error: "Book is not available for reservation." });
    }

    reservation.status = status;
    await reservation.save();

    if (status === "Approved") {
      book.availability = false;
    }

    await book.save();

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  reserveBook,
  getAllReservations,
  getUserReservations,
  reservationStatus,
};
