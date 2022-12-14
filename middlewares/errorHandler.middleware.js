const ErrorResponse = require("../util/helpers/ErrorResponse");

function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.name === "CastError") {
        err = ErrorResponse.badRequest("Cast Error");
    }
    if (err.name === "ValidationError") {
        err = ErrorResponse.badRequest("Validation error");
    }
    if (err.type === "validation") {
        return res.status(400).json({ err });
    }
    if (err instanceof ErrorResponse) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }

    res.status(500).json({ success: false, message: "Something went wrong" });
}

module.exports = errorHandler;
