module.exports = {
    async up(db, client) {
        const modelInsertResult = await db.collection('models').insertMany([
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
        ]);

        const hallucinations = [];
        for (const key of Object.keys(modelInsertResult.insertedIds)) {
            const modelId = modelInsertResult.insertedIds[key];
            for (let i = 0; i < 100; i++) {
                hallucinations.push({
                    model_id: modelId,
                    date: new Date(),
                    prompt: `Model ${modelId} prompt #${i + 1}`,
                    bad_response: `Model ${modelId} incorrect response #${
                        i + 1
                    }`,
                    p_tuned: Math.random() < 0.5,
                });
            }
        }

        const batchSize = 500;
        for (let i = 0; i < hallucinations.length; i += batchSize) {
            await db
                .collection('hallucinations')
                .insertMany(hallucinations.slice(i, i + batchSize));
        }
    },

    async down(db, client) {
        await db.collection('hallucinations').deleteMany({});
        await db.collection('models').deleteMany({});
    },
};
