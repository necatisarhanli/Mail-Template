const mongoose = require("mongoose"); // import mongoose

// mail schema --unnecessary for now  . Maybe in the long run we might want to save our mails on db

const mailSchema = mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Mail", mailSchema);
