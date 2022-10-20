const Sequelize = require("sequelize");
const sequlize = require("../../config/db.config");
const ACCOUNT_TYPES = require("../../config/accountTypes");

//
const User = sequlize.define(
    "user",
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        birthDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        confirmed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        tokenVersion: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        accountType: {
            type: Sequelize.ENUM(Object.values(ACCOUNT_TYPES)),
            defaultValue: ACCOUNT_TYPES.STUDENT,
            allowNull: false,
        },
        gender: {
            type: Sequelize.ENUM(["MALE", "FEMALE"]),
            defaultValue: "MALE",
            allowNull: false,
        },
        // salaire: {
        // 	type: Sequelize.DOUBLE,
        // 	allowNull: true
        // }
        // sopecificData => for teachers => [classesId] that he teaches + salarire
        // sopecificData => for student => his classeId
        specificData: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        blockedAt: {
            type: Sequelize.DATE,
        },
        lastBlockReason: {
            type: Sequelize.STRING,
        },
    },
    {
        underscored: true,
        timestamps: true,
        paranoid: true,
    }
);

module.exports = User;
