const mongoose = require("mongoose"); // import mongoose

const TemplateSchema = mongoose.Schema({
  templateName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  fav: {
    type: Boolean
  },
  default: {
    type: Boolean
  }
});

module.exports = mongoose.model("Templates", TemplateSchema);
