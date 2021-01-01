const User = require("../models/User");
const Form = require('../models/form-model');
const jwt = require('jsonwebtoken');

module.exports.get_form = (req, res) => {
    Form.findOne({_id: req.body.formID}, {formName: 1, formElements: 1})
    .then((form)=>{
        console.log("Got the from");
        res.send(form);
    })
    .catch((err)=>{
        console.log(err);
        res.send(false);
    })
}
module.exports.delete_form = (req, res) => {
    console.log("Inside the delete form function")
    Form.findOneAndDelete({_id: req.body.formID })
    .then((response)=>{
        console.log("Form Deleted");
        res.send(true);
    })
    .catch((err)=>{
        console.log("Form could NOT be deleted");
        console.log(err);
        res.send(false);
    }); 
}

module.exports.submit_form = (req, res) => {
    console.log("Form ready to be submitted");
    var response = req.body;
    var formID = response.formID;
    delete response.formID;
    console.log(response);
    Form.findOneAndUpdate({_id: formID},{ 
        "$push": { "responses": response } 
    }, {new: true})
    .then((updatedForm)=>{
        console.log("Form Updated");
        // res.send("Form Submitted");
        res.redirect('/formsubmission?result=true');
    })
    .catch((err)=>{
        console.log(err);
        res.redirect('/formsubmission?result=false');
        // res.send("Failed to update the form");
    })
}

module.exports.save_form = (req, res) => {
    console.log("API has been hit - POST");
    console.log(req.user);

    new Form({
        formName: req.body.formName,
        userID: req.user._id,
        formElements: req.body.formElements,
        responses: []
        
    }).save().then((newForm) => {
        // Once new form created, redirect user to login page.
        console.log('created new Form: ', newForm);
        // res.send("User added to DB");
        // res.redirect(307, '/auth/locallogin');
        res.send({formID: newForm._id})
    })
    .catch((error)=>{
        console.log(error);
    });
}

module.exports.update_form = (req, res) => {
    console.log("API has been hit - POST");
    console.log(req.user);

    Form.findOneAndUpdate({_id: req.body.formID}, {
        formElements: req.body.formElements,
        formName: req.body.formName
    }, {new: true})
    .then((updatedForm)=>{
        console.log("Form Updated");
        res.send("Updated the form");
    })
    .catch((err)=>{
        console.log(err);
    })
}