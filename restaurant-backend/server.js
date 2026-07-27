const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const reservationRoutes = require("./routes/reservationRoutes");
const menuRoutes = require("./routes/menuRoutes");
const menuController = require("./controllers/menuController");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/menu", menuController.getMenu);
app.use("/api/menu", menuRoutes);

app.use("/api/reservations", reservationRoutes);

app.get("/", (req, res) => {
  res.send("Restaurant backend is running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});