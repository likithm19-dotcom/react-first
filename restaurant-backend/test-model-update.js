const Reservation = require('./models/reservationModel');

const id = 1;
const data = {
  name: 'saad',
  email: 'saad@example.com',
  phone: '3219637890',
  date: '2026-08-10',
  time: '15:23:00',
  guests: 5,
  table_id: null,
};

Reservation.updateReservation(id, data, (err, result) => {
  if (err) {
    console.error('MODEL ERROR:', err);
  } else {
    console.log('MODEL RESULT:', result);
  }
  process.exit(0);
});
