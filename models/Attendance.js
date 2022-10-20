const Sequelize = require("sequelize");
const sequlize = require("../config/db.config");
const User = require("./User/User");
const Seance = require("./Seance/Seance");

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

Seance.hasMany(Attendance, {
    foreignKey: "seanceId",
});
Attendance.belongsTo(Seance, {
    foreignKey: "seanceId",
});

User.hasMany(Attendance, {
    foreignKey: "studentId",
});
Attendance.belongsTo(User, {
    foreignKey: "studentId",
});

module.exports = Attendance;
