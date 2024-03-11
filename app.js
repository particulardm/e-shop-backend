const express = require('express');
const dotenv = require('dotenv').config();

const guestRouter = require('./routes/guestRoutes');

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/', guestRouter);

app.listen(port, () => console.log(`listening on ${port} port...`));

