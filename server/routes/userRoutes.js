const express = require("express");
const { body, param } = require("express-validator");
const { validate } = require("../middleware/validationMiddleware");
const {
  checkAdminRole,
  authMiddleware,
} = require("../middleware/authMiddleware");
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteReserveRequest,
  updateUser,
} = require("../controllers/userController");
const {
  getAllReservations,
  reservationStatus,
  getUserReservations,
  reserveBook,
} = require("../controllers/adminController");

const router = express.Router();

// Get all users
router.get("/users", authMiddleware, checkAdminRole, getAllUsers);

// Get User reservations
router.get("/reservations", authMiddleware, getUserReservations);

// Get all reservations for all user
router.get(
  "/reservations/all",
  authMiddleware,
  checkAdminRole,
  getAllReservations
);

// Update user role
router.put(
  "/users/:id",
  [param("id").isMongoId(), body("role").isIn(["Member", "Admin"]).notEmpty()],
  validate,
  authMiddleware,
  checkAdminRole,
  updateUserRole
);

// Update User Details
router.patch(
  "/edit/:userId",
  [
    param("userId").isMongoId(),
    body("name").optional().isString(),
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("password").optional().isLength({ min: 6 }),
  ],
  validate,
  authMiddleware,
  updateUser
);

// Reserve Book request
router.post(
  "/reserve/:bookId",
  [param("bookId").isMongoId()],
  validate,
  authMiddleware,
  reserveBook
);

// Update reservations status
router.patch(
  "/reservations/:id",
  [param("id").isMongoId(), body("status").isIn(["Approved", "Rejected"])],
  validate,
  authMiddleware,
  checkAdminRole,
  reservationStatus
);

// Delete User
router.delete(
  "/users/:id",
  [param("id").isMongoId()],
  validate,
  authMiddleware,
  checkAdminRole,
  deleteUser
);

// Delete reservation requst
router.delete(
  "/reservation/:RId",
  [param("RId").isMongoId()],
  validate,
  authMiddleware,
  deleteReserveRequest
);

module.exports = router;
