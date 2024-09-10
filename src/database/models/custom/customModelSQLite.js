const { DataTypes } = require('sequelize');


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
