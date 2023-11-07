const { DataTypes } = require('sequelize');
const sequelize = require('../database_pgSql/dbconfig/sequelize-config');

const Organization = require('./Organization');

const ModelModel = sequelize.define(
    'Model',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        org_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        openAIId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        base_model: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        git_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        commit_hash: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        visibility: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        gpt_version: {
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

ModelModel.belongsTo(Organization, { foreignKey: 'org_id' });
Organization.hasMany(ModelModel, { foreignKey: 'org_id' });

module.exports = ModelModel;
