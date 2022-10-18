'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');
const User = require('./User/User');

const Paiement = sequlize.define('paiement', {
	id: {
		primaryKey: true,
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true
	},
	date_paiement: {
		type: Sequelize.DATE,
		allowNull: false
	},
	mode_paiement: {
		type: Sequelize.ENUM('cheque', 'cash'),
		allowNull: false
	},
	montant_paiement: {
		type: Sequelize.DOUBLE,
		allowNull: false
	}
});
User.hasMany(Paiement, {
	foreignKey: 'adminId'
});
Paiement.belongsTo(User, {
	foreignKey: 'adminId'
});
User.hasMany(Paiement, {
	foreignKey: 'studentId'
});
Paiement.belongsTo(User, {
	foreignKey: 'studentId'
});

module.exports = Paiement;
