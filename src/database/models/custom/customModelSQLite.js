const { DataTypes } = require('sequelize');

/**
 * Initializes the CustomModel in SQLite.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CustomModel.
 */
function initializeCustomModel(sequelize) {
    const CustomModel = sequelize.define('CustomModel', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return CustomModel;
}

module.exports = initializeCustomModel;
