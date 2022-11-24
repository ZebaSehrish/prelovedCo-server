const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('prelovedCo server is running');
})

app.listen(port, () => {
    console.log(`PrelovedCo is running on ${port}`);
})