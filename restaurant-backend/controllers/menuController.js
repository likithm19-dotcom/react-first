const menuModel = require("../models/menuModel");

const getMenu = (req, res) => {
    console.log("Menu route hit", req.url);
    menuModel.getMenu((err, results) => {
        if (err) {
            console.error("Menu query error", err);
            return res.status(500).json({
                message: "Error fetching menu"
            });
        }

        res.json(results);
    });
};

module.exports = {
    getMenu
};