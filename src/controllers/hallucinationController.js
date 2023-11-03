/* eslint-disable camelcase */
// controllers/hallucinationController.js
const Hallucination = require('../models/Hallucination');
const { Parser } = require('json2csv');

exports.getHallucinationsByModelId = async (req, res) => {
    try {
        let { page = 1, limit = 20, start, end } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        const model_id = req.params.model_id;
        const query = { model_id: model_id };

        if ((start && !end) || (!start && end)) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide both start and end dates.',
            });
        }

        if (start && end && new Date(start) > new Date(end)) {
            return res.status(400).json({
                status: 'error',
                message: 'The start date must be before the end date.',
            });
        }

        if (start && end) {
            query.date = {
                $gte: new Date(start),
                $lte: new Date(end),
            };
        }

        const options = {
            page: page,
            limit: limit,
            sort: { date: -1 },
            populate: 'model_id',
        };

        const hallucinations = await Hallucination.paginate(query, options);
        res.status(200).json(hallucinations);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error getting hallucinations by model ID',
            error: error.message,
        });
    }
};

exports.downloadHallucinationsCsv = async (req, res) => {
    try {
        const model_id = req.params.model_id;
        const { start, end } = req.query;
        const query = { model_id: model_id };

        if ((start && !end) || (!start && end)) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide both start and end dates.',
            });
        }

        if (start && end && new Date(start) > new Date(end)) {
            return res.status(400).json({
                status: 'error',
                message: 'The start date must be before the end date.',
            });
        }

        if (start && end) {
            query.date = {
                $gte: new Date(start),
                $lte: new Date(end),
            };
        }

        const hallucinations = await Hallucination.find(query).lean();
        const fields = ['date', 'prompt', 'bad_response', 'p_tuned'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(hallucinations);

        res.header('Content-Type', 'text/csv');
        res.attachment(`hallucinations-${model_id}.csv`);
        res.send(csv);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error generating CSV file',
            error: error.message,
        });
    }
};
// Add more controller methods as needed
