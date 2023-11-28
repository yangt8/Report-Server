require('dotenv').config();
require('./src/database/dbconfig/DB_mongodb_connection');
const Utilities = require('./src/Utilities');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const modelRoutes = require('./src/routes/modelRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js API',
            version: '1.0.0',
            description: 'A simple Node.js API',
        },
    },
    apis: ['./src/routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());
app.use('/api', modelRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(logger('dev'));
app.use(Utilities.send404);
app.disable('x-powered-by');

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
