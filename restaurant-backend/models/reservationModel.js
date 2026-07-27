const db = require("../db");

const createReservation = (reservation, callback) => {
  const sql = `
    INSERT INTO reservation
    (name, email, phone, date, time, guests)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      reservation.name,
      reservation.email,
      reservation.phone,
      reservation.date,
      reservation.time,
      reservation.guests,
    ],
    callback
  );
};

module.exports = {
  createReservation,
};