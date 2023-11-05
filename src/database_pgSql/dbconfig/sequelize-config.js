const { Sequelize } = require('sequelize');
require('dotenv').config();

const postgresURI = process.env.POSTGRES_URI;
console.log(postgresURI);

const sequelize = new Sequelize(postgresURI, {
    dialect: 'postgres',
    logging: console.log,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('');
        console.log(
            '********** Successfully Connected To PostgreSQL **********',
        );
        console.log('');
    })
    .catch((err) => {
        console.error(
            '********** Unable to connect to the PostgreSQL database:',
            err,
        );
        console.error('');
    });

module.exports = sequelize;
