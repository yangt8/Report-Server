// routes/hallucinationRoutes.js
const express = require('express');
const router = express.Router();
const hallucinationController = require('../controllers/hallucinationController');

router.get(
    '/hallucinations/:model_id',
    hallucinationController.getHallucinationsByModelId,
);

router.get(
    '/hallucinations/:model_id/download',
    hallucinationController.downloadHallucinationsCsv,
);

// Add more routes as needed
module.exports = router;
