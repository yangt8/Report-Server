// routes/modelRoutes.js
const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');

/**
 * @swagger
 * /api/models:
 *   post:
 *     summary: createModel
 *     description: To create a new model.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - openAIId
 *               - gptVersion
 *               - environment
 *             properties:
 *               name:
 *                 type: string
 *               openAIId:
 *                 type: string
 *               gptVersion:
 *                 type: string
 *               environment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Model created successfully.
 *       400:
 *         description: Error creating model.
 */
router.post('/models', modelController.createModel);

/**
 * @swagger
 * /api/models:
 *   get:
 *     summary: getModels
 *     description: To get all models.
 *     responses:
 *       200:
 *         description: Models got successfully.
 *       500:
 *         description: Error getting models.
 */
router.get('/models', modelController.getModels);

/**
 * @swagger
 * /api/models/names:
 *   get:
 *     summary: getModelsNamesAndIds
 *     description: To get Models' names and Ids.
 *     responses:
 *       200:
 *         description: Models' names and Ids got successfully.
 *       500:
 *         description: Error getting models names and IDs.
 */
router.get('/models/names', modelController.getModelsNamesAndIds);

// Add more routes as needed

module.exports = router;
