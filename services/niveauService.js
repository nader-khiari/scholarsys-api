const sequelize = require("sequelize");
const Niveau = require("../models/niveau");

class niveauService {
    //#region stats
    static async count(options) {
        let result = await Niveau.findOne({
            where: options ?? {},
            attributes: [[sequelize.fn("COUNT", "*"), "value"]],
            raw: true,
            nest: true,
        });
        return result;
    }
    //#endregion
}

module.exports = niveauService;
