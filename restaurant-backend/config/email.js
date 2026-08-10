const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

if (!EMAIL_USER || !EMAIL_PASSWORD) {
    console.error("Email configuration error: EMAIL_USER and EMAIL_PASSWORD must be set in .env");
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
});

module.exports = transporter;