const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//app configurations
app.use(express.json());

app.use(express.urlencoded({extended:false}));

//route.
const mpesa = require('./routes');

//listening to a specific route
app.use('/mpesa', mpesa);


//listening to a port.

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});