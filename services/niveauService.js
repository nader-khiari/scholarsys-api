const sequelize = require("sequelize");
const Niveau = require("../models/niveau");

class niveauService {
    //#region stats
    static async count(options) {
        return await Niveau.findOne({
            where: options ?? {},
            attributes: [[sequelize.fn("COUNT", "*"), "value"]],
            raw: true,
            nest: true,
        });
    }
    //#endregion
}

module.exports = niveauService;
