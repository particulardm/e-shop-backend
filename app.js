const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const guestRouter = require('./routes/guestRoutes');
const itemModel = require('./models/itemModel');
const { getItems, addToCart, getCart } = require('./controllers/guestController');

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/', guestRouter);

app.listen(port, () => console.log(`listening on ${port} port...`));

