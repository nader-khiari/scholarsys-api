const Sequelize = require('sequelize');
const sequilize = require('../../config/db.config');
const Seance = require('../Seance/Seance');
const Classe = require('../classe');
const User = require('../User/User');

const Emploi = sequilize.define(
	'emploi',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		}
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true
	}
);

Emploi.hasMany(Seance);
Seance.belongsTo(Emploi);

Classe.hasMany(Emploi);
Emploi.belongsTo(Classe);

module.exports = Emploi;
