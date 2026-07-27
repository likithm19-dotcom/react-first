const reservationModel = require("../models/reservationModel");

const createReservation = (req, res) => {
  const reservation = req.body;

  reservationModel.createReservation(reservation, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to book reservation",
      });
    }

    res.status(201).json({
      message: "Reservation booked successfully!",
    });
  });
};

module.exports = {
  createReservation,
};