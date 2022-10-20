"use strict";
const Sequelize = require("sequelize");
const sequlize = require("../config/db.config");

const Niveau = sequlize.define(
    "niveau",
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        designation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        acronyme: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
);

module.exports = Niveau;
