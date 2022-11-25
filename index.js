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


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.s0qswnv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const categoriesCollection = client.db('prelovedCo').collection('categories');
const categoryDetailsCollection = client.db('prelovedCo').collection('categoryDetails');
const bookingsCollection = client.db('prelovedCo').collection('bookings');


async function run() {
    try {
        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        })

        app.get('/categoryDetails', async (req, res) => {
            // console.log(req.query);
            let query = {};

            if (req.query.category_id) {
                query = {
                    category_id: req.query.category_id
                }
            }
            //console.log(query);
            const cursor = categoryDetailsCollection.find(query);
            const details = await cursor.toArray();
            res.send(details);
        })

        app.get('/categoryDetails/:category_id', async (req, res) => {
            const category_id = req.params.category_id;
            const filter = { category_id };
            const result = await categoryDetailsCollection.findOne(filter);
            res.send(result);
        });

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const bookings = await bookingsCollection.find(query).toArray();
            res.send(bookings);

        })

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('prelovedCo server is running');
})

app.listen(port, () => {
    console.log(`PrelovedCo is running on ${port}`);
})