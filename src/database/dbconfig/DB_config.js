require('dotenv').config();

const ENV = {};
// ENV.MONGO_URI = process.env.MONGO_URI;
ENV.MONGO_URI =
    'mongodb+srv://yangt:test@cluster0.20bs0fs.mongodb.net/?retryWrites=true&w=majority';
module.exports = ENV;
