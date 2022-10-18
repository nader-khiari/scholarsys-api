const Sequelize = require("sequelize");
const sequlize = require("../../config/db.config");
const ROLES = require("../../config/roles");
const Classe = require("../classe");
const Emploi = require("../Emploi/Emploi");
const Matiere = require("../matiere");
const Note = require("../note");
const Seance = require("../Seance/Seance");

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
        role: {
            type: Sequelize.TEXT,
            defaultValue: ROLES.STUDENT,
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
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);
//prof has many seance
User.hasMany(Seance, {
    foreignKey: "teacherId",
});

//seance belongs to prof
Seance.belongsTo(User, {
    foreignKey: "teacherId",
});

//seance belongs to admin
Seance.belongsTo(User, {
    foreignKey: "adminId",
});

// admin
User.hasMany(Emploi, {
    foreignKey: "adminId",
});

// table emploi contains adminId created EMPLOI
Emploi.belongsTo(User, {
    foreignKey: "adminId",
});

// could cause probs
User.hasMany(Seance, {
    foreignKey: "adminId",
});

User.belongsToMany(Classe, {
    through: "teacher_classes",
    foreignKey: "teacherId",
});
Classe.belongsToMany(User, {
    through: "teacher_classes",
    foreignKey: "classeId",
});

User.hasMany(Note, {
    foreignKey: "teacherId",
});
Note.belongsTo(User, {
    foreignKey: "teacherId",
});

User.hasMany(Note, {
    foreignKey: "studentId",
});
Note.belongsTo(User, {
    foreignKey: "studentId",
});

Matiere.hasMany(Seance);
Seance.belongsTo(Matiere);

module.exports = User;
