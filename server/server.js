const express = require('express');
const app = express();
var cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

//for static files
app.use(express.static('public'));

app.use(bodyParser.json());

//Middleware for parsing post requests
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongodb');
});
//to avoid deprecation warnings
mongoose.set('useFindAndModify', false);

//so we can use the user model
const Form = require('./models/form-model');

// create home route
app.get('/', (req, res) => {
    res.send('home');
});

// test route
app.post('/savedata', (req, res) => {
    console.log("API has been hit - POST");
    console.log(req.body);

    Form.findOne({_id: req.body.formID})
    .then((currentForm) => {
        if(currentForm){
            console.log("Found a matching form");
            // If there is already a form with same formID, then update form
            res.send("Form found with same id. It should be updated");
        }else{
            console.log("Nooooo.")
            
            new Form({
                userID: req.body.userID,
                formElements: req.body.formElements,
                responses: []
                
            }).save().then((newForm) => {
                
                // Once new form created, redirect user to login page.
                console.log('created new Form: ', newForm);
                // res.send("User added to DB");
                // res.redirect(307, '/auth/locallogin');
                res.send("New form created!")
            })
            .catch((error)=>{
                console.log(error);
            });

            // res.send("Not found matching form");
        }
    })
    .catch((error)=>{
        console.log("Did not find matching form");
        console.log(error);
        res.send("Error Occured");
    })

    //         // If the form is new, create a new form in the DB
            // new Form({
            //     userID: req.body.userID,
            //     formElements: req.body.formElements,
            //     responses: []
                
            // }).save().then((newForm) => {

            //     // Once new form created, redirect user to login page.
            //     console.log('created new Form: ', newForm);
            //     // res.send("User added to DB");
            //     // res.redirect(307, '/auth/locallogin');
            //     res.send("New form created!")
            // });
    //     }
    // });

    // res.send('Data reached successfully');
});

app.get('/test', (req, res) => {
    console.log("API has been hit - GET");
    console.log(req);
    res.send('Backend successfully connected');
});

app.listen(5000, () => {
    console.log('app now listening for requests on port 5000');
});