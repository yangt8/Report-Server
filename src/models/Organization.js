const { DataTypes } = require('sequelize');
const sequelize = require('../database_pgSql/dbconfig/sequelize-config');

const Organization = sequelize.define(
    'Organization',
    {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: 'users_organization',
        timestamps: false,
    },
);

module.exports = Organization;
