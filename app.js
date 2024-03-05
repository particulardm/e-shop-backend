const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const itemModel = require('./models/itemModel');
const redisSet = require('./db/redisSet');

const app = express();

const port = process.env.PORT || 3001;
const uri = process.env.URI;

app.use(express.json());

app.get('/', async (req, res) => {
    if (!req.headers.cookie) {
        const uuid = uuidv4();
        console.log(uuid);

        const emptyArray = [];
        const emptyArrayAsString = JSON.stringify(emptyArray);

        redisSet(uuid, emptyArrayAsString);

        res.set('Set-Cookie', `Session: ${uuid}`);
    }

    try {
    await mongoose.connect(uri);
    console.log('db connected');
    const items = await itemModel.find({ });

    res.status(200).json(items);
    }
    catch(error) {
        return res.status(400).json({ message: 'Something is wrong!', error})
    }
    finally {
        await mongoose.disconnect();
        console.log('db disconnected');
    }
})

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const session = req.headers.cookie.split(' ')[1];
    console.log(session);

    try {
        await mongoose.connect(uri);
        console.log('db connected');
        const item = await itemModel.find({ _id: id});
        // console.log(item);
        sessionCart[session].push(item[0]);
        console.log(sessionCart);
    
        res.status(200).json(sessionCart);
        }
        catch(err) {
            return res.status(400).json({ message: 'Something is wrong!', error: err})
        }
        finally {
            await mongoose.disconnect();
            console.log('db disconnected');
        }
})

app.listen(port, () => console.log(`listening on ${port} port...`));

