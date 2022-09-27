const express = require('express');

const router = express.Router();

const mpesa = require('../controllers/mpesa');

router.get('/get-auth-token', mpesa.getOAuthToken);

router.post('/lipa-na-mpesa', mpesa.getOAuthToken, mpesa.lipaNaMpesaOnline);

router.post('/lipa-na-mpesa-callback', mpesa.lipaNaMpesaOnlineCallback);

module.exports = router;
