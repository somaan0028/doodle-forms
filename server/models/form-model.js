const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    formName: String,
    userID: String,
    formElements: Array,
    responses: Array,
    time : Number,
    numOfResponses: Number

});

const Form = mongoose.model('form', formSchema);

module.exports = Form;
