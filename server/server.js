const express = require('express');
const app = express();
var cors = require("cors");

//for static files
app.use(express.static('public'));

//Middleware for parsing post requests
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// create home route
app.get('/', (req, res) => {
    res.send('home');
});

// test route
app.get('/test', (req, res) => {
    console.log("API has been hit");
    res.send('Backend successfully connected');
});

app.listen(5000, () => {
    console.log('app now listening for requests on port 5000');
});