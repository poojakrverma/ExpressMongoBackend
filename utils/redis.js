import redis from 'redis'

let redisClient;
const redisOptions = {
    socket: {
        host: 'singapore-redis.render.com',
        port: 6379,
    },
    username: 'red-chgkj4m7avjbbjrbeh5g',
    password: 'SCAt6uHZ6ynGhl5h2eQ19UYVPASGwz4w',
};



// export async function connectToRedis() {

//     console.log("redis");
//     redisClient = redis.createClient(redisOptions);

//     // redisClient.on('connect', () => {
//     //     console.log('Already Connected to Redis');
//     // });

//     redisClient.connect();
//     redisClient.on('connect', () => {
//         console.log('Connected to Redis');
//     });

//     redisClient.on('error', (err) => {
//         console.error('Redis connection error:', err);
//     });

//     redisClient.on('error', err => console.log('Redis Server Error', err));

//     // console.log(redisClient);
//     // console.log(await redisClient.set('foo', 'bar')); // 'OK'
//     // console.log(await redisClient.get('foo')); // 'bar'

// }

export async function disconnectFromRedis() {
    redisClient.quit((err) => {
        if (err) {
            console.error('Error disconnecting from Redis:', err);
        }
        console.log('Disconnected from Redis');
    });
    console.log('Disconnected from Redis');
}

// Function to store data in Redis
export function setData(key, value, expirationTimeInSeconds, callback) {
    const client = redis.createClient(redisOptions);

    client.connect();
    client.on('connect', () => {
        client.set(key, value, 'EX', expirationTimeInSeconds, (error, result) => {
            if (error) {
                console.error('Error storing data in Redis:', error);
            }
            console.log('data stored');
            client.quit();
            callback(result);
        });
    });

    client.on('error', (error) => {
        console.error('Error connecting to Redis:', error);
        client.quit();
    });
}

// Function to retrieve data from Redis
export function getData(key, callback) {
    const client = redis.createClient(redisOptions);

    client.on('connect', () => {
        client.get(key, (error, result) => {
            if (error) {
                console.error('Error retrieving data from Redis:', error);
            }
            client.quit();
            callback(result);
        });
    });

    client.on('error', (error) => {
        console.error('Error connecting to Redis:', error);
        client.quit();
    });
}



// Export the methods to make them accessible from other files
// module.exports  = {
//     setData,
//     getData
// };