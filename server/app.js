const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers/customer-details', (req, res) => {
    const dataPath = path.join(__dirname, './data/customerDetails.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const customerData = JSON.parse(data);
        res.send(customerData);
    });
});

app.get('/api/customers/:id', (req, res) => {
    const dataPath = path.join(__dirname, './data/customerAddress.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const customerId = req.params["id"];
        const customerData = JSON.parse(data);
        const customerDetail = customerData.data.filter((customer) =>{
            return customer.customerId === Number(customerId)
        });
        res.send(customerDetail);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));