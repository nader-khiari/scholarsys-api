const jwt = require('jsonwebtoken');
const ErrorResponse = require('../util/helpers/ErrorResponse');
const isAuthenticated = (req, res, next) => {
	try {
		const authorization = req.headers.authorization || req.headers.Authorization;
		if (!authorization) {
			throw ErrorResponse.unauthorized();
		}
		const token = authorization.split(' ')[1];
		const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
		if (!payload.accountType) {
			throw ErrorResponse.unauthorized();
		}
		req.accountType = payload.accountType; //for the req.accountType based authorization
		req.userId = payload.userId;
		next();
	} catch (err) {
		// console.log(err);
		next(err);
	}
};

module.exports = isAuthenticated;
