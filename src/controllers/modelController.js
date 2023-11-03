/* eslint-disable no-tabs */
// controllers/modelController.js
const Model = require('../models/Model');

exports.createModel = async (req, res) => {
    try {
        const newModel = new Model(req.body);
        await newModel.save();
        res.status(201).json({
            status: 'success',
            message: 'Model created successfully',
            data: {
                id: newModel._id,
                name: newModel.name,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error creating model',
            error: error.message,
        });
    }
};

exports.getModels = async (req, res) => {
    try {
        const models = await Model.find();
        res.status(200).send(models);
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error getting models',
            error: error.message,
        });
    }
};

exports.getModelsNamesAndIds = async (req, res) => {
    try {
        const models = await Model.findNamesAndIds();
        res.status(200).send(models);
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error getting models names and IDs',
            error: error.message,
        });
    }
};

exports.deleteModel = async (req, res) => {
    try {
        const modelId = req.params.id;
        const model = await Model.findByIdAndDelete(modelId);
        if (!model) {
            return res.status(404).json({
                status: 'error',
                message: 'Model not found',
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Model deleted successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error deleting model',
            error: error.message,
        });
    }
};

// Add more controller methods as needed
