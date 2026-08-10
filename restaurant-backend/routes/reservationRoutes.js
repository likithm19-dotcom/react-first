

const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservationController");

const authMiddleware = require("../middleware/authMiddleware");

console.log('reservationRoutes handlers:', typeof authMiddleware, typeof reservationController.getAllReservationsByPhone);
console.log('reservationController exports:',
    'addReservation=', typeof reservationController.addReservation + ',',
    'getAllReservations=', typeof reservationController.getAllReservations + ',',
    'getAllReservationsByPhone=', typeof reservationController.getAllReservationsByPhone + ',',
    'updateReservation=', typeof reservationController.updateReservation + ',',
    'deleteReservation=', typeof reservationController.deleteReservation
);

router.post("/", reservationController.addReservation);

//get all reservations
router.get("/", reservationController.getAllReservations);

//get all reservations by phone number
router.get("/phone/:phone", authMiddleware, reservationController.getAllReservationsByPhone);

//get current logged in user's reservations
router.get("/me", authMiddleware, reservationController.getMyReservations);

//update reservation
router.put("/:id", (req, res, next) => {
    console.log("PUT Route Hit");
    next();
}, reservationController.updateReservation);


//delete reservation
router.delete("/:id", reservationController.deleteReservation);

module.exports = router;