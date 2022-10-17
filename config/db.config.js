// db should be here
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER_ACCOUNT, process.env.DATABASE_PASSWORD, {
	// logging: false,
	dialect: 'mysql',
	host: process.env.DATABASE_HOST
});
module.exports = sequelize;
