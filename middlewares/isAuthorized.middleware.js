const jwt = require("jsonwebtoken");
const ErrorResponse = require("../util/helpers/ErrorResponse");
const ROLES = require("../config/roles");

const verifyRole = (...allowedRoles) => {
    //  * Implementation getting user role  from jwt *
    return (req, res, next) => {
        const authorization =
            req.headers.authorization || req.headers.Authorization;

        try {
            if (!authorization) {
                throw ErrorResponse.unauthorized();
            }
            const token = authorization.split(" ")[1];
            const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

            if (!payload.role) {
                throw ErrorResponse.unauthorized();
            }
            const rolesArray = [...allowedRoles];
            const result = rolesArray.some(
                (role) => ROLES[role] === payload.role
            );
            if (!result) {
                throw ErrorResponse.unauthorized();
            }
            next();
        } catch (err) {
            next(err);
        }
        next();
    };
    // * Implementation getting user role from req*
    // return (req, res, next) => {
    // 	try {
    // 		if (!req.role) {
    // 			throw Error('role is missing');
    // 		}
    // 		const rolesArray = [ ...allowedRoles ];
    // 		const result = rolesArray
    // 			.map((role) => roles.get(role) === req.role)
    // 			.find((val) => val === true);
    // 		if (!result) {
    // 			throw new Error('not authorized');
    // 		}
    // 		next();
    // 	} catch (err) {
    // 		console.log(err);
    // 		next(err);
    // 	}
    // };
};

module.exports = verifyRole;
