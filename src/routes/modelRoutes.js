// routes/modelRoutes.js
const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');

router.post('/models', modelController.createModel);
router.get('/models', modelController.getModels);
router.get('/models/names', modelController.getModelsNamesAndIds);

// Add more routes as needed

module.exports = router;
