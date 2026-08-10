const Reservation = require("../models/reservationModel");
const nodemailer = require("nodemailer");

// =====================================================
// EMAIL CONFIGURATION
// =====================================================

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",

    port: process.env.SMTP_PORT
        ? Number(process.env.SMTP_PORT)
        : 587,

    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// =====================================================
// CHECK EMAIL CONNECTION
// =====================================================

transporter.verify((error, success) => {
    if (error) {
        console.error("Email transporter error:", error);
    } else {
        console.log("Email transporter verified.", success);
    }
});


// =====================================================
// ADD RESERVATION
// =====================================================

exports.addReservation = (req, res) => {

    console.log("ADD RESERVATION DATA:", req.body);

    Reservation.checkTableAvailability(
        req.body.table_id,
        req.body.date,
        req.body.time,
        (err, result) => {

            if (err) {

                console.error(
                    "Availability Check Error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Error checking table availability"
                });
            }

            // Table already booked
            if (result.length > 0) {

                return res.status(400).json({
                    message:
                        "Table is already booked for this date and time."
                });
            }

            // Create reservation
            Reservation.create(
                req.body,
                async (err, result) => {

                    if (err) {

                        console.error(
                            "Reservation Error:",
                            err
                        );

                        return res.status(500).json({
                            message:
                                "Failed to create reservation"
                        });
                    }

                    // ==========================================
                    // SEND CONFIRMATION EMAIL
                    // ==========================================

                    try {

                        const info =
                            await transporter.sendMail({

                                from:
                                    process.env.EMAIL_USER,

                                to:
                                    req.body.email,

                                subject:
                                    "Nawabs Restaurant - Reservation Confirmation",

                                html: `
                                    <div style="
                                        font-family: Arial, sans-serif;
                                        max-width: 600px;
                                        margin: auto;
                                        padding: 20px;
                                        border: 1px solid #ddd;
                                        border-radius: 10px;
                                    ">

                                        <h2>
                                            Reservation Confirmed!
                                        </h2>

                                        <p>
                                            Hello
                                            <strong>
                                                ${req.body.name}
                                            </strong>,
                                        </p>

                                        <p>
                                            Your reservation at
                                            <strong>
                                                Nawabs Restaurant
                                            </strong>
                                            has been successfully confirmed.
                                        </p>

                                        <h3>
                                            Reservation Details
                                        </h3>

                                        <p>
                                            <strong>Name:</strong>
                                            ${req.body.name}
                                        </p>

                                        <p>
                                            <strong>Email:</strong>
                                            ${req.body.email}
                                        </p>

                                        <p>
                                            <strong>Phone:</strong>
                                            ${req.body.phone}
                                        </p>

                                        <p>
                                            <strong>Date:</strong>
                                            ${req.body.date}
                                        </p>

                                        <p>
                                            <strong>Time:</strong>
                                            ${req.body.time}
                                        </p>

                                        <p>
                                            <strong>Guests:</strong>
                                            ${req.body.guests}
                                        </p>

                                        <p>
                                            <strong>Table:</strong>
                                            ${req.body.table_id}
                                        </p>

                                        <br>

                                        <p>
                                            Thank you for choosing
                                            <strong>
                                                Nawabs Restaurant!
                                            </strong>
                                        </p>

                                    </div>
                                `
                            });

                        console.log(
                            "Reservation confirmation email sent:",
                            info.response
                        );

                    } catch (emailError) {

                        console.error(
                            "Confirmation email failed:",
                            emailError
                        );
                    }

                    return res.status(201).json({

                        message:
                            "Reservation Added Successfully"

                    });

                }
            );
        }
    );
};


// =====================================================
// GET ALL RESERVATIONS
// =====================================================

exports.getAllReservations = (req, res) => {

    Reservation.getAllReservations(
        (err, result) => {

            if (err) {

                console.error(
                    "Get All Reservations Error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Error fetching reservations"
                });
            }

            res.json(result);
        }
    );
};


// =====================================================
// GET RESERVATIONS BY PHONE
// =====================================================

exports.getAllReservationsByPhone = (req, res) => {

    console.log(
        "GET RESERVATIONS BY PHONE:",
        req.params.phone
    );

    Reservation.getAllReservationsByPhone(
        req.params.phone,
        (err, result) => {

            if (err) {

                console.error(
                    "Get Reservations By Phone Error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Error fetching reservations"
                });
            }

            res.json(result);
        }
    );
};


// =====================================================
// GET CURRENT LOGGED-IN USER RESERVATIONS
// =====================================================

exports.getMyReservations = (req, res) => {

    console.log(
        "========== GET MY RESERVATIONS =========="
    );

    console.log(
        "Logged-in user:",
        req.user
    );

    if (!req.user || !req.user.phone) {

        return res.status(400).json({
            message:
                "Unable to determine current user phone."
        });
    }

    Reservation.getAllReservationsByPhone(
        req.user.phone,
        (err, result) => {

            if (err) {

                console.error(
                    "Get My Reservations Error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Error fetching reservations"
                });
            }

            console.log(
                "Reservations returned:",
                result
            );

            res.json(result);
        }
    );
};


// =====================================================
// UPDATE RESERVATION
// =====================================================

exports.updateReservation = (req, res) => {

    const reservationId = req.params.id;

    console.log(
        "===================================="
    );

    console.log(
        "UPDATE RESERVATION"
    );

    console.log(
        "Reservation ID:",
        reservationId
    );

    console.log(
        "Update Data:",
        req.body
    );

    console.log(
        "===================================="
    );


    // ==========================================
    // CHECK TABLE AVAILABILITY
    // ==========================================

    Reservation.checkTableAvailability(
        req.body.table_id,
        req.body.date,
        req.body.time,
        (err, result) => {

            if (err) {

                console.error(
                    "Availability Check Error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Error checking table availability"
                });
            }


            // Remove current reservation
            // from availability result

            const otherReservations =
                result.filter(
                    (reservation) =>
                        String(reservation.id) !==
                        String(reservationId)
                );


            // Table booked by somebody else

            if (otherReservations.length > 0) {

                return res.status(400).json({

                    message:
                        "Table is already booked for this date and time."

                });
            }


            // ==========================================
            // UPDATE DATABASE
            // ==========================================

            Reservation.updateReservation(
                reservationId,
                req.body,
                async (err, result) => {

                    if (err) {

                        console.error(
                            "Update Error:",
                            err
                        );

                        return res.status(500).json({
                            message:
                                "Reservation update failed"
                        });
                    }


                    console.log(
                        "Reservation updated successfully"
                    );


                    // ==========================================
                    // SEND UPDATED EMAIL
                    // ==========================================

                    try {

                        const info =
                            await transporter.sendMail({

                                from:
                                    process.env.EMAIL_USER,

                                to:
                                    req.body.email,

                                subject:
                                    "Nawabs Restaurant - Reservation Updated",

                                html: `
                                    <div style="
                                        font-family: Arial, sans-serif;
                                        max-width: 600px;
                                        margin: auto;
                                        padding: 20px;
                                        border: 1px solid #ddd;
                                        border-radius: 10px;
                                    ">

                                        <h2>
                                            Reservation Updated
                                        </h2>

                                        <p>
                                            Hello
                                            <strong>
                                                ${req.body.name}
                                            </strong>,
                                        </p>

                                        <p>
                                            Your reservation at
                                            <strong>
                                                Nawabs Restaurant
                                            </strong>
                                            has been successfully updated.
                                        </p>

                                        <h3>
                                            Updated Reservation Details
                                        </h3>

                                        <p>
                                            <strong>Date:</strong>
                                            ${req.body.date}
                                        </p>

                                        <p>
                                            <strong>Time:</strong>
                                            ${req.body.time}
                                        </p>

                                        <p>
                                            <strong>Guests:</strong>
                                            ${req.body.guests}
                                        </p>

                                        <p>
                                            <strong>Table:</strong>
                                            ${req.body.table_id}
                                        </p>

                                        <p>
                                            <strong>Phone:</strong>
                                            ${req.body.phone}
                                        </p>

                                        <br>

                                        <p>
                                            Thank you for choosing
                                            <strong>
                                                Nawabs Restaurant!
                                            </strong>
                                        </p>

                                    </div>
                                `
                            });


                        console.log(
                            "Updated reservation email sent:",
                            info.response
                        );


                    } catch (emailError) {

                        console.error(
                            "Updated reservation email failed:",
                            emailError
                        );
                    }


                    return res.status(200).json({

                        message:
                            "Reservation Updated Successfully"

                    });

                }
            );
        }
    );
};


// =====================================================
// DELETE RESERVATION
// =====================================================

exports.deleteReservation = (req, res) => {

    const reservationId = req.params.id;

    console.log(
        "===================================="
    );

    console.log(
        "DELETE RESERVATION"
    );

    console.log(
        "Reservation ID:",
        reservationId
    );

    console.log(
        "===================================="
    );


    // ==========================================
    // FIRST GET RESERVATION
    // ==========================================

    Reservation.getReservationById(
        reservationId,
        (err, reservation) => {

            if (err) {

                console.error(
                    "Get Reservation Error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Error finding reservation"
                });
            }


            // Reservation doesn't exist

            if (!reservation) {

                return res.status(404).json({
                    message:
                        "Reservation not found"
                });
            }


            console.log(
                "Reservation found:",
                reservation
            );

            console.log(
                "Cancellation email:",
                reservation.email
            );


            // ==========================================
            // DELETE RESERVATION FROM DATABASE
            // ==========================================
             Reservation.deleteReservation(
                reservationId,
                async (err, result) => {

                    if (err) {
                        console.error("DELETE ERROR:", err);

                        return res.status(500).json({
                            message: "Reservation deletion failed"
                        });
                    }

                    console.log(
                        "DELETED:",
                        result.affectedRows
                    );

                    // 3. SEND EMAIL
                    try {

                        console.log(
                            "SENDING CANCELLATION EMAIL..."
                        );

                        const info =
                            await transporter.sendMail({
                                from: process.env.EMAIL_USER,

                                to: reservation.email,

                                subject:
                                    "Nawabs Restaurant - Reservation Cancelled",

                                html: `
                                    <h2>Reservation Cancelled</h2>

                                    <p>
                                        Hello
                                        <strong>
                                            ${reservation.name}
                                        </strong>,
                                    </p>

                                    <p>
                                        Your reservation at
                                        <strong>
                                            Nawabs Restaurant
                                        </strong>
                                        has been cancelled successfully.
                                    </p>

                                    <h3>Cancelled Reservation Details</h3>

                                    <p>
                                        <strong>Date:</strong>
                                        ${reservation.date}
                                    </p>

                                    <p>
                                        <strong>Time:</strong>
                                        ${reservation.time}
                                    </p>

                                    <p>
                                        <strong>Guests:</strong>
                                        ${reservation.guests}
                                    </p>

                                    <p>
                                        <strong>Table:</strong>
                                        ${reservation.table_id}
                                    </p>

                                    <p>
                                        Thank you for choosing
                                        Nawabs Restaurant.
                                    </p>
                                `
                            });

                        console.log(
                            "CANCELLATION EMAIL SENT SUCCESSFULLY"
                        );

                        console.log(
                            "MESSAGE ID:",
                            info.messageId
                        );

                        console.log(
                            "EMAIL RESPONSE:",
                            info.response
                        );

                    } catch (emailError) {

                        console.error(
                            "CANCELLATION EMAIL ERROR:"
                        );

                        console.error(emailError);
                    }

                    // 4. Tell frontend deletion succeeded
                    return res.json({
                        message:
                            "Reservation Deleted Successfully"
                    });
                }
            );
        }
    );
};
