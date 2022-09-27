const axios = require("axios");
const {Buffer} = require("buffer")

const me = (req, res) => {
	res.send("mnhjhjdjhdj")
}

const getOAuthToken = async (req, res, next) => {
    let customer_key = process.env.consumer_key;
    let consumer_secret = process.env.consumer_secret;

    let url = process.env.oauth_token_url;

    let buffer = Buffer.from(customer_key + ":" + consumer_secret);

    let auth = `Basic ${buffer.toString("base64")}`;

    try {
        let { data } = await axios.get(url, {
            headers: {
                Authorization: auth,
            },
        });

        req.token = data["access_token"];

        return next();
    } catch (error) {
        return res.send({
            success: false,
            message: error["response"]["statusText"],
        });
    }
};

const lipaNaMpesaOnline = async (req, res) => {
    let token = req.token;
    let auth = `Bearer ${token}`;

    //timestamp
    let timestamp = require("../middleware/timeStamp").timestamp;

    let url = process.env.lipa_na_mpesa_url;
    let businessShortCode = process.env.lipa_na_mpesa_shortcode;
    let passkey = process.env.lipa_na_mpesa_passkey;

    let password = new Buffer.from(
        `${businessShortCode}${passkey}${timestamp}`
    ).toString("base64");

    let transcationType = "CustomerPayBillOnline";
    let amount = 1;
    let partyA = "254707256013";
    let partyB = process.env.lipa_na_mpesa_shortcode;
    let phoneNumber = "254707256013";
    let callBackUrl = "https://f931-197-156-142-157.in.ngrok.io/mpesa/lipa-na-mpesa-callback";
    let accountReference = "lipa_na_mpesa_app";
    let transaction_desc = "Testing lipa na mpesa functionality";

    try {
        let { data } = await axios.post(
            url,
            {
                BusinessShortCode: process.env.lipa_na_mpesa_shortcode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: transcationType,
                Amount: amount,
                PartyA: partyA,
                PartyB: partyB,
                PhoneNumber: phoneNumber,
                CallBackURL: callBackUrl,
                AccountReference: accountReference,
                TransactionDesc: transaction_desc,
            },
            {
                headers: {
                    Authorization: auth,
                },
            }
		);
		
		console.log(data);

        return res.send({
            success: true,
            message: data,
        });
	} catch (error) {
		console.log(error);
        return res.send({
            success: false,
            message: error
        });
    }
};

const lipaNaMpesaOnlineCallback = async (req, res) => {
	let message = req.body.Body.stkCallback["ResultDesc"];
	
	console.log(req.body.Body);

    return res.send({
        success: true,
        message,
    });
};


module.exports = {
	getOAuthToken,
	lipaNaMpesaOnline,
	lipaNaMpesaOnlineCallback,
	me
}