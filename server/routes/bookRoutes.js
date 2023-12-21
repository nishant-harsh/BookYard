const express = require("express");
const { body, param } = require("express-validator");
const { validate } = require("../middleware/validationMiddleware");
const {
  getAllBooks,
  addBook,
  bookAvailability,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const {
  authMiddleware,
  checkAdminRole,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Get all books
router.get("/books", getAllBooks);

// Get book by ID
router.get("/:id", [param("id").isMongoId()], validate, getBook);

// Add a new book
router.post(
  "/add",
  [
    body("title").notEmpty(),
    body("author").notEmpty(),
    body("pubYear").isInt(),
    body("availability").isBoolean().optional(),
    body("genre").notEmpty(),
    body("bookImage").isURL(),
  ],
  validate,
  authMiddleware,
  checkAdminRole,
  addBook
);

// Update a book
router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("title").notEmpty().optional(),
    body("author").notEmpty().optional(),
    body("pubYear").isInt().optional(),
    body("availability").isBoolean().optional(),
    body("genre").notEmpty().optional(),
    body("bookImage").isURL().optional(),
  ],
  validate,
  authMiddleware,
  checkAdminRole,
  updateBook
);

// Update book availability / return a book
router.patch(
  "/:id/availability",
  [param("id").isMongoId(), body("availability").isBoolean()],
  validate,
  authMiddleware,
  bookAvailability
);

// Delete book
router.delete(
  "/:id",
  [param("id").isMongoId()],
  validate,
  authMiddleware,
  checkAdminRole,
  deleteBook
);

module.exports = router;
