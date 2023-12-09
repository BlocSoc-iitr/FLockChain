const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  session_name: String,
  model_type: String,
  no_of_clients: Number,
  no_of_layers: String,
  display: String,
});

const blogs = mongoose.model("blogs", blogSchema);

module.exports = { blogs };