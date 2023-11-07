'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('models', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            org_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users_organization',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            openAIId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            base_model: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            git_url: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            commit_hash: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            visibility: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            gpt_version: {
                type: Sequelize.ENUM('3.5', '4'),
                allowNull: false,
            },
            environment: {
                type: Sequelize.ENUM('Production', 'Pre-production', 'Both'),
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('models');
    },
};
