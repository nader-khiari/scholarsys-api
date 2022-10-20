const Sequelize = require("sequelize");
const sequlize = require("../config/db.config");

const Attendance = sequlize.define(
    "attendance",
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        state: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
);

module.exports = Attendance;
