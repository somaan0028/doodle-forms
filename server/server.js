const express = require('express');
const app = express();
var cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Form = require('./models/form-model');
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


app.get('*', checkUser);
app.post('*', checkUser);

// create home route
app.get('/', (req, res) => {
    res.send('home');
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

app.get('/authtest', (req, res)=>{
    const token = req.cookies.jwt;
    console.log("Trying to check for authentication");
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
        if (err) {
            console.log("Token not valid");
            res.send(false);

        } else {
            console.log("Valid Token. Send 'true'");
            res.send(true);
            
        }});
    } else {
        console.log("No token found");
        res.send(false);
    }
});

app.use(authRoutes);
app.use(formRoutes);

app.listen(5000, () => {
    console.log('app now listening for requests on port 5000');
});