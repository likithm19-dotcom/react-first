const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const reservationRoutes = require("./routes/reservationRoutes");
const menuRoutes = require("./routes/menuRoutes");
const menuController = require("./controllers/menuController");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const transporter = require("./config/email");
transporter.verify((err, success) => {
  if (err) {
    console.error("Email transporter verification failed:", err);
  } else {
    console.log("Email transporter verified.", success);
  }
});

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.get("/api/menu", menuController.getMenu);
app.use("/api/menu", menuRoutes);


app.get("/api/tables", (req, res) => {
    db.query("SELECT * FROM tables", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Restaurant backend is running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});