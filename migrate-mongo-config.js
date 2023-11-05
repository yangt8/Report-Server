const ENV = require('./src/database_MongoDB/dbconfig/DB_config');
const config = {
    mongodb: {
        url: ENV.MONGO_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //   connectTimeoutMS: 3600000,
            //   socketTimeoutMS: 3600000,
        },
    },
    migrationsDir: 'src/database_MongoDB/migrations',
    changelogCollectionName: 'changelog',
};
module.exports = config;
