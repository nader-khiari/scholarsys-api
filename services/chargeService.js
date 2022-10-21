const sequelize = require("sequelize");
const Charge = require("../models/charge");

class chargeService {
    //#region stats
    static async amountSum(options) {
        let result = await Charge.findOne({
            where: options ?? {},
            attributes: [
                [
                    sequelize.cast(
                        sequelize.fn(
                            "COALESCE",
                            sequelize.fn(
                                "SUM",
                                sequelize.col("montant_facture")
                            ),
                            0
                        ),
                        "int"
                    ),
                    "value",
                ],
            ],
            raw: true,
            nest: true,
        });
        return result;
    }

    static async amountSumByDate(where = {}, dateFormat = "%Y-%m-%d") {
        return await Charge.findAll({
            where: where,
            attributes: [
                [
                    sequelize.fn(
                        "DATE_FORMAT",
                        sequelize.col("created_at"),
                        dateFormat
                    ),
                    "date",
                ],
                [
                    sequelize.cast(
                        sequelize.fn("SUM", sequelize.col("montant_facture")),
                        "int"
                    ),
                    "value",
                ],
            ],
            group: "date",
            raw: true,
            nest: true,
        });
    }
    //#endregion
}

module.exports = chargeService;
