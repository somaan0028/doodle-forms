const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    userID: String,
    formElements: Array,
    responses: Array
});

const Form = mongoose.model('form', formSchema);

module.exports = Form;
