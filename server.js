require('dotenv').config();
// MongoDB connection
require('./src/database_MongoDB/dbconfig/DB_mongodb_connection');
// Sequelize connection
const sequelize = require('./src/database_pgSql/dbconfig/sequelize-config');

const Utilities = require('./src/Utilities');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

// Introduce routes
const modelRoutes = require('./src/routes/modelRoutes');
const hallucinationRoutes = require('./src/routes/hallucinationRoutes');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());
app.use('/api', modelRoutes);
app.use('/api', hallucinationRoutes);

app.use(logger('dev'));
app.use(Utilities.send404);
app.disable('x-powered-by');

// Sync Sequelize models
sequelize.sync().then(() => {
    console.log('Connected to PostgreSQL and models synced.');
});

const server = app
    .listen(process.env.PORT || process.env.APP_PORT, () => {
        console.log(
            `********** Server is running on  http://localhost:${
                server.address().port
            }  **********`,
        );
    })
    .on('error', (error) => {
        console.log(
            '********** \x1b[31mPort ' +
                error.port +
                ' is already in use\x1b[0m **********',
        );
    });
