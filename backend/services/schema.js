const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
    User_Address : String,
    session_name: String,
    model_type: String,
    no_of_clients: Number,
    no_of_layers: Number,
    activation_function : String,
    Optimizer : String,
    Desired_Accuracy : Number,
    display : Number
});

const forms = mongoose.model("forms", FormSchema);

module.exports = { forms };