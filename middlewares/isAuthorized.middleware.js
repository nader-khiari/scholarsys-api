const jwt = require("jsonwebtoken");
const ErrorResponse = require("../util/helpers/ErrorResponse");
const ACCOUNT_TYPES = require("../config/accountTypes");

const verifyAccountType = (...allowedAccountTypes) => {
    //  * Implementation getting user accountType  from jwt *
    return (req, res, next) => {
        const authorization =
            req.headers.authorization || req.headers.Authorization;

        try {
            if (!authorization) {
                throw ErrorResponse.unauthorized();
            }
            const token = authorization.split(" ")[1];
            const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

            if (!payload.accountType) {
                throw ErrorResponse.unauthorized();
            }
            const accountTypesArray = [...allowedAccountTypes];
            const result = accountTypesArray.some(
                (accountType) =>
                    ACCOUNT_TYPES[accountType] === payload.accountType
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
    // * Implementation getting user accountType from req*
    // return (req, res, next) => {
    // 	try {
    // 		if (!req.accountType) {
    // 			throw Error('accountType is missing');
    // 		}
    // 		const accountTypesArray = [ ...allowedAccountTypes ];
    // 		const result = accountTypesArray
    // 			.map((accountType) => accountTypes.get(accountType) === req.accountType)
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

module.exports = verifyAccountType;
