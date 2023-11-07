/* eslint-disable no-tabs */
require('dotenv').config({ path: '../../../.env' });
const ModelModel = require('../../models/Model');
const Organization = require('../../models/Organization');

async function createTestData() {
    try {
        await ModelModel.sync({ force: true }); // Warning: This will drop the table and recreate it.

        const organizations = await Organization.findAll();

        const testData = [
            {
                org_id: organizations[0].id,
                name: 'GPT-3.5 Model A',
                openAIId: 'gpt-3.5-a',
                base_model: 'GPT-3.5',
                git_url: 'https://github.com/example/repo.git',
                commit_hash: 'abc123',
                visibility: true,
                description: 'A model of GPT-3.5',
                gpt_version: '3.5',
                environment: 'Production',
            },
            {
                org_id: organizations[0].id,
                name: 'GPT-4 Model B',
                openAIId: 'gpt-4-b',
                base_model: 'GPT-4',
                git_url: 'https://github.com/example/repo.git',
                commit_hash: 'def456',
                visibility: false,
                description: 'A model of GPT-4',
                gpt_version: '4',
                environment: 'Pre-production',
            },
            {
                org_id: organizations[0].id,
                name: 'GPT-4 Model C',
                openAIId: 'gpt-4-c',
                base_model: 'GPT-4',
                git_url: 'https://github.com/example/repo.git',
                commit_hash: 'ghi789',
                visibility: true,
                description: 'Another model of GPT-4',
                gpt_version: '4',
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
