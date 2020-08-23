import axios from 'axios'

const express = require("express");
const router = express.Router();

router.get('/ListCustomer', (req, res) => {
    axios.get('http://allway.southeastasia.cloudapp.azure.com/devAllwayApi/Api/Repair/ListCustomer').then(
        res => res.data
    ).then(data => {
        res.json(data)
    }).catch(error => console.log(error));
});

router.get('/ListDevice', (req, res) => {
    axios.get('http://allway.southeastasia.cloudapp.azure.com/devAllwayApi/Api/Repair/ListDevice').then(
        res => res.data
    ).then(data => {
        res.json(data)
    }).catch(error => console.log(error));
});

router.get('/ListProblem', (req, res) => {
    axios.get('http://allway.southeastasia.cloudapp.azure.com/devAllwayApi/Api/Repair/ListProblem').then(
        res => res.data
    ).then(data => {
        res.json(data)
    }).catch(error => console.log(error));
});
router.post('/CreateOrder', (req, res) => {
    axios.post('http://allway.southeastasia.cloudapp.azure.com/devAllwayApi/Api/Repair/CreateOrder', req.body).then(
        res => res.data
    ).then(data => {
        res.json(data)
    }).catch(error => console.log(error));
});
module.exports = router;