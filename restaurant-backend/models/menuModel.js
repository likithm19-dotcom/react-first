const db = require("../db");

const getMenu = (callback) => {
    db.query("SELECT * FROM menu", callback);
};

module.exports = {
    getMenu
};