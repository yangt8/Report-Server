require('dotenv').config({ path: '../../../.env' });
const ModelModel = require('../../models/Model');

async function createTestData() {
    try {
        await ModelModel.sync({ force: true }); // Warning: This will drop the table and recreate it.

        const testData = [
            {
                name: 'GPT-3.5 Model A',
                openAIId: 'gpt-3.5-a',
                gptVersion: '3.5',
                environment: 'Production',
            },
            {
                name: 'GPT-4 Model B',
                openAIId: 'gpt-4-b',
                gptVersion: '4',
                environment: 'Pre-production',
            },
            {
                name: 'GPT-4 Model C',
                openAIId: 'gpt-4-c',
                gptVersion: '4',
                environment: 'Both',
            },
        ];

        for (const data of testData) {
            await ModelModel.create(data);
        }

        console.log('Test data created!');
    } catch (error) {
        console.error('Failed to create test data:', error);
    }
}

createTestData();
