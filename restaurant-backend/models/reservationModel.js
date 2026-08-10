const db = require("../db");

// ==========================================
// CHECK TABLE AVAILABILITY
// ==========================================

exports.checkTableAvailability = (
    tableId,
    date,
    time,
    callback
) => {

    const sql = `
        SELECT *
        FROM reservation
        WHERE table_id = ?
        AND date = ?
        AND time = ?
    `;

    db.query(
        sql,
        [tableId, date, time],
        (err, result) => {

            if (err) {
                console.error(
                    "AVAILABILITY ERROR:",
                    err
                );

                return callback(err, null);
            }

            callback(null, result);
        }
    );
};


// ==========================================
// CREATE RESERVATION
// ==========================================

exports.create = (data, callback) => {

    const sql = `
        INSERT INTO reservation
        (
            name,
            email,
            phone,
            date,
            time,
            guests,
            table_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.name,
            data.email,
            data.phone,
            data.date,
            data.time,
            data.guests,
            data.table_id
        ],
        callback
    );
};


// ==========================================
// GET RESERVATION BY ID
// Used before deleting so we can get
// the user's email and reservation details
// ==========================================

exports.getReservationById = (id, callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            phone,
            DATE_FORMAT(date, '%Y-%m-%d') AS date,
            time,
            guests,
            table_id
        FROM reservation
        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        (err, result) => {

            if (err) {
                console.error(
                    "GET RESERVATION BY ID ERROR:",
                    err
                );

                return callback(err, null);
            }

            if (result.length === 0) {
                return callback(null, null);
            }

            callback(null, result[0]);
        }
    );
};


// ==========================================
// GET ALL RESERVATIONS
// ==========================================

exports.getAllReservations = (callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            phone,
            DATE_FORMAT(date, '%Y-%m-%d') AS date,
            time,
            guests,
            table_id
        FROM reservation
        ORDER BY date ASC, time ASC
    `;

    db.query(
        sql,
        callback
    );
};


// ==========================================
// GET RESERVATIONS BY PHONE
// ==========================================

exports.getAllReservationsByPhone = (
    phone,
    callback
) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            phone,
            DATE_FORMAT(date, '%Y-%m-%d') AS date,
            time,
            guests,
            table_id
        FROM reservation
        WHERE phone = ?
        ORDER BY date ASC, time ASC
    `;

    db.query(
        sql,
        [phone],
        callback
    );
};


// ==========================================
// UPDATE RESERVATION
// ==========================================

exports.updateReservation = (
    id,
    data,
    callback
) => {

    const fields = [];
    const values = [];

    Object.entries(data).forEach(
        ([key, value]) => {

            // Never update ID
            if (
                key !== "id" &&
                value !== undefined
            ) {

                fields.push(
                    `${key} = ?`
                );

                values.push(value);
            }
        }
    );

    if (fields.length === 0) {

        return callback(
            null,
            {
                affectedRows: 0
            }
        );
    }

    values.push(id);

    const sql = `
        UPDATE reservation
        SET ${fields.join(", ")}
        WHERE id = ?
    `;

    console.log(
        "UPDATE SQL:",
        sql
    );

    console.log(
        "UPDATE VALUES:",
        values
    );

    db.query(
        sql,
        values,
        callback
    );
};


// ==========================================
// DELETE RESERVATION
// ==========================================

exports.deleteReservation = (
    id,
    callback
) => {

    const sql = `
        DELETE FROM reservation
        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );
};