const menuModel = require("../models/menuModel");

const getMenu = async (req, res) => {
  try {
    const menu = await menuModel.getAllMenu();

    res.status(200).json(menu);
  } catch (error) {
    console.error("MENU DATABASE ERROR:", error);

    res.status(500).json({
      message: "Error fetching menu",
      error: error.message,
    });
  }
};

module.exports = {
  getMenu,
};