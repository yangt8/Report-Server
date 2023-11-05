const { DataTypes } = require('sequelize');
const sequelize = require('../database_pgSql/dbconfig/sequelize-config');

const ModelModel = sequelize.define(
    'Model',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        openAIId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gptVersion: {
            type: DataTypes.ENUM('3.5', '4'),
            allowNull: false,
        },
        environment: {
            type: DataTypes.ENUM('Production', 'Pre-production', 'Both'),
            allowNull: false,
        },
    },
    {
        tableName: 'models',
        timestamps: true,
    },
);

module.exports = ModelModel;
