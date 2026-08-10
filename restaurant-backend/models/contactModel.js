const db = require("../db");

exports.create = (data, callback) => {
  const sql = `
    INSERT INTO contact
    (name, email, message, date, time, table_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.name,
      data.email,
      data.message,
      data.date,
      data.time,
      data.table_id,
    ],
    callback
  );
};