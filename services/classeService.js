const sequelize = require("sequelize");
const Classe = require("../models/classe");

class classeService {
    //#region stats
    static async count(options) {
        return await Classe.findOne({
            where: options ?? {},
            attributes: [[sequelize.fn("COUNT", "*"), "value"]],
            raw: true,
            nest: true,
        });
    }
    //#endregion
}

module.exports = classeService;
