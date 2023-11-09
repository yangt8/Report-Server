/* eslint-disable quote-props */
const mongoose = require('mongoose');
const Hallucination = require('../models/Hallucination');
// eslint-disable-next-line no-unused-vars
const AggregatedData = require('../models/AggregatedData');

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const aggregateData = async () => {
    try {
        const end = new Date(); // Current time
        const start = new Date(end);
        start.setHours(end.getHours() - 1); // Start time of the previous hour

        const results = await Hallucination.aggregate([
            { $match: { date: { $gte: start, $lt: end } } }, // Select events from the last hour only
            {
                $group: {
                    _id: null, // Not using model_id as _id
                    model_ids: { $addToSet: '$model_id' }, // Collect all unique model_ids
                    count: { $sum: 1 },
                },
            },
            { $unwind: '$model_ids' }, // Unwind the model_ids array to create multiple documents
            {
                $project: {
                    _id: 0, // Do not display _id field
                    model_id: '$model_ids', // Assign the unwound model_id
                    count: 1,
                    'Aggregation Timeframe': {
                        $concat: [
                            {
                                $dateToString: {
                                    format: '%Y-%m-%dT%H:00',
                                    date: start,
                                },
                            },
                            ' - ',
                            { $dateToString: { format: '%H:00', date: end } },
                        ],
                    },
                },
            },
            { $addFields: { aggregatedAt: new Date() } },
            {
                $merge: {
                    into: 'aggregatedData',
                    whenMatched: 'merge',
                    whenNotMatched: 'insert',
                },
            },
        ]);
        console.log('Aggregation complete:', results);
    } catch (error) {
        console.error('Aggregation error:', error);
    } finally {
        mongoose.disconnect();
    }
};

aggregateData();
