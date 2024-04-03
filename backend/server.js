const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;
const BASE_URL = process.env.API_URL;
const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

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
        console.log("Error in Auth: ", err);
        res.status(500).send(err);
    }
}

const allCompaniesResponses = [];

// api to retrive top n products
app.get('/categories/:categoryname/products', auth, async (req, res) => {
    try {
        const category = req.params.categoryname;
        const top = req.query.top;
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;

        if (!category || !top || !minPrice || !maxPrice) {
            res.status(400).send({
                message: "Required Parameters Missing"
            });
            return;
        }

        allCompaniesResponses = [];
        for (const company of companies) {
            const response = await axios.get(`${BASE_URL}/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {
                headers: {
                    'Authorization': `Bearer ${req.accessToken}`
                }
            });
            allCompaniesResponses.push({ company: company, data: response.data });
        };
        res.status(200).send(allCompaniesResponses);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// api to retrive details of a product
app.get('/categories/:categoryname/products/:productid', auth, async (req, res) => {
    try {
        const productId = req.params.productid;
        const category = req.params.categoryname;
        const company = req.query.companyName;
        const n = req.query.top;
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;

        if (!company || !productId || !category || !n || !minPrice || !maxPrice) {
            res.status(400).send({
                message: "Required Parameters Missing"
            });
            return;
        }

        const filteredData = allCompaniesResponses.filter(
            item => item.data.name === productId || "" &&
                item.company.name === company || "" &&
                item.data.category === category || "" &&
                item.data.price >= minPrice && item.data.price <= maxPrice
        );
        if (filteredData.length > 0) {
            res.status(200).send(filteredData);
        }
        else {
            res.status(404).send({
                message: "Product Not Found"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.listen(PORT);