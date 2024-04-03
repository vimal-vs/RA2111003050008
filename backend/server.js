const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;
const BASE_URL = process.env.API_URL;

app.set('port', PORT);

// auth-middleware
const auth = async (req, res, next) => {
    try {
        const response = await axios.post(`${BASE_URL}/test/auth`,
            {
                companyName: "goMart",
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                ownerName: "Vimal Sakkthi V S",
                ownerEmail: "vv4861@srmist.edu.in",
                rollNo: "RA2111003050008"
            }
        );
        if (response.data.access_token) {
            req.accessToken = response.data.access_token;
            next();
        }
        else {
            res.status(401).send({
                message: "Invalid Auth Token"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

app.listen(PORT);