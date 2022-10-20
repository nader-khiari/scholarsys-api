const Sequelize = require("sequelize");
const sequilize = require("../../config/db.config");

const Emploi = sequilize.define(
    "emploi",
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
);

module.exports = Emploi;
