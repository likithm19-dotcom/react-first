const Contact = require("../models/contactModel");

exports.addContact = (req, res) => {
  Contact.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Message sent successfully"
    });
  });
};