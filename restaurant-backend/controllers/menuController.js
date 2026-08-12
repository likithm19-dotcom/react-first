const menuModel = require("../models/menuModel");

const getMenu = (req, res) => {
  menuModel.getMenu((err, results) => {
    if (err) {
      console.error("MENU DATABASE ERROR:", err);

      return res.status(500).json({
        message: "Error fetching menu",
        error: err.message,
      });
    }

    res.status(200).json(results);
  });
};

module.exports = {
  getMenu,
};