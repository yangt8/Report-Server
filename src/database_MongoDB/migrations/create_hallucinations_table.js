/* eslint-disable no-tabs */
require('dotenv').config();
// Importing PostgreSQL and MongoDB clients
const { Client } = require('pg');
const MongoClient = require('mongodb').MongoClient;

// Connection strings for PostgreSQL and MongoDB
const postgresUri = process.env.POSTGRES_URI;
const mongoUri = process.env.MONGO_URI;

// PostgreSQL client
const pgClient = new Client({
    connectionString: postgresUri,
});

// MongoDB client
const mongoClient = new MongoClient(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = {
    async up() {
        try {
            await pgClient.connect();
            console.log('Connected to PostgreSQL successfully');
            await mongoClient.connect();
            console.log('Connected to MongoDB successfully');
            const mongoDB = mongoClient.db();

            // Retrieve model data from PostgreSQL
            const res = await pgClient.query('SELECT id, name FROM models;');
            const models = res.rows;
            console.log(models);

            // Create 100 Hallucination records for each model
            const hallucinations = [];
            models.forEach((model) => {
                for (let i = 0; i < 100; i++) {
                    hallucinations.push({
                        model_id: `${model.id}`, // Use the id from PostgreSQL as a reference
                        date: new Date(),
                        prompt: `Model ${model.name} prompt #${i + 1}`,
                        bad_response: `Model ${
                            model.name
                        } incorrect response #${i + 1}`,
                        p_tuned: Math.random() < 0.5,
                    });
                }
            });

            // Bulk insert Hallucination records into MongoDB
            console.log(
                `Inserting hallucinations, total count: ${hallucinations.length}`,
            );
            const batchSize = 500;
            for (let i = 0; i < hallucinations.length; i += batchSize) {
                await mongoDB
                    .collection('hallucinations')
                    .insertMany(hallucinations.slice(i, i + batchSize));
            }
            console.log('Migration Up completed successfully');
        } catch (err) {
            console.error('Migration Up failed:', err);
        } finally {
            await pgClient.end();
            await mongoClient.close();
        }
    },

    async down() {
        try {
            console.log('Migration script started');
            await mongoClient.connect();
            const db = mongoClient.db();

            // Delete Hallucination records
            await db.collection('hallucinations').deleteMany({});
            console.log('Hallucination records deleted.');

            // Delete Model records
            await db.collection('models').deleteMany({});
            console.log('Model records deleted.');

            console.log('Migration Down completed successfully');
        } catch (err) {
            console.error('Migration Down failed:', err);
        } finally {
            await mongoClient.close();
        }
    },
};
