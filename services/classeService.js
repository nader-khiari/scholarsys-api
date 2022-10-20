const sequelize = require("sequelize");
const Classe = require("../models/classe");

class classeService {
    //#region stats
    static async count(options) {
        let result = await Classe.findOne({
            where: options ?? {},
            attributes: [[sequelize.fn("COUNT", "*"), "value"]],
            raw: true,
            nest: true,
        });
        return result;
    }
    //#endregion
}

module.exports = classeService;
