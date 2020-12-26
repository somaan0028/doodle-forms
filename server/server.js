const express = require('express');
const app = express();
var cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

//for static files
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(cookieParser());

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

app.get('*', checkUser);
app.post('*', checkUser);

// create home route
app.get('/', (req, res) => {
    res.send('home');
});

// updates form
app.post('/updateform', (req, res) => {
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
});

// sends form back to front-end
app.post('/getform', (req, res) => {
    Form.findOne({_id: req.body.formID}, {formName: 1, formElements: 1})
    .then((form)=>{
        console.log("Got the from");
        res.send(form);
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.post('/submitform', (req, res) => {
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
        res.redirect('/formsubmitted');
    })
    .catch((err)=>{
        console.log(err);
        res.send("Failed to update the form");
    })
});

app.post('/saveform', (req, res) => {
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
});

app.post('/authtest', (req, res)=>{
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            res.send(false);
            // res.redirect('/login');
        } else {
            // console.log(decodedToken);
            let user = User.findById(decodedToken.id);
            // console.log(user);
            
            // User logged in therefore send what was asked for.
            if (req.body.requiredData == 'AllCreatedForms') {
                console.log("now have to return all created forms");

                Form.find({userID: req.user._id}, {formName: 1, _id: 1})
                .then((forms)=>{
                    res.send(forms);
                })
            }else if (req.body.requiredData == 'SingleForm') {
                console.log("Now have to send data for " + req.body.formID);
                Form.findOne({_id: req.body.formID})
                .then((form)=>{
                    console.log("Got the from");
                    if (form.userID == req.user._id) {
                        console.log("form sent!!!");
                        res.send(form);
                    }else{
                        console.log("Not authorized!!");
                        res.send("Not authorized.");
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
                // res.send(true);
            }else if(req.body.requiredData == 'AllResponses'){
                Form.findOne({_id: req.body.formID}, {formName: 1, responses: 1, userID: 1})
                .then((form)=>{
                    console.log("Got the from");
                    if (form.userID == req.user._id) {
                        console.log("Responses sent!!!");
                        res.send(form);
                    }else{
                        console.log("Not authorized!!");
                        res.send("Not authorized.");
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            }else{
                res.send(true);
            }
            
        }});
    } else {
        res.send(false);
        // res.redirect('/login');
    }
});

app.use(authRoutes);

app.listen(5000, () => {
    console.log('app now listening for requests on port 5000');
});