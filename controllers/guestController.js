const { createClient } = require('redis');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const itemModel = require('../models/itemModel');

const uri = process.env.URI;
let client;

async function getItems (req, res) {
    if (!req.headers.cookie) {
        const uuid = uuidv4();
        console.log(uuid);

        const emptyArray= JSON.stringify([]);


    try {
        client = await createClient();

        await client.connect()
        console.log('Connected to Redis');

        const added_value = await client.set(uuid, emptyArray);
        console.log(added_value);
    } catch(err) {
        console.error(err);
    } finally{
        await client.disconnect();
    }
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
}

async function addToCart (req, res) {
    const id = req.params.id;
    console.log(id);
    const session = req.headers.cookie.split(' ')[1];
    console.log(session);

    try {
        await mongoose.connect(uri);
        console.log('db connected');
        const item = await itemModel.findOne({ _id: id});
        console.log(item);

        client = await createClient();
        await client.connect()
        console.log('Connected to Redis');

        const val = JSON.parse(await client.get(session));
        val.push(item.name);
        console.log(val);
        await client.set(session, JSON.stringify(val));
        console.log('success?');
    
        res.status(200).json({ message: `Added to cart: ${item.name}` });
        }
        catch(err) {
            console.error(err);
            return res.status(400).json({ message: 'Something is wrong!', error: err})
        }
        finally {
            await client.disconnect();
            await mongoose.disconnect();
            console.log('db and redis disconnected');
        }
}

async function getCart (req, res) {
    const session = req.headers.cookie.split(' ')[1];
    console.log(session);

    try {
        client = await createClient();
        await client.connect()
        console.log('Connected to Redis');

        const cart = JSON.parse(await client.get(session));
        console.log(cart);
        console.log('cart should be displayed');
    
        res.status(200).json({ message: `Cart for your session: ${cart}` });
        }
        catch(err) {
            console.error(err);
            return res.status(400).json({ message: 'Something is wrong!', error: err})
        }
        finally {
            await client.disconnect();
            console.log('redis disconnected');
        }
}   

module.exports = { getItems, addToCart, getCart }