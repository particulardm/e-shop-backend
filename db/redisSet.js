const redis = require('redis');

const client = redis.createClient({
    host: '127.0.0.1', 
    port: 6379,        
    });

async function setRedis (key, value) {  
    try {
        await client.connect()
        console.log('Connected to Redis');

        const added_value = await client.set(key, value);
        console.log(added_value);
    } catch(err) {
        console.error(err);
    } finally{
        await client.quit();
    }
}

module.exports = setRedis;
