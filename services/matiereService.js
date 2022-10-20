const sequelize = require("sequelize");
const Matiere = require("../models/matiere");

class matiereService {
    //#region stats
    static async count(options) {
        let result = await Matiere.findOne({
            where: options ?? {},
            attributes: [[sequelize.fn("COUNT", "*"), "value"]],
            raw: true,
            nest: true,
        });
        return result;
    }
    //#endregion
}

module.exports = matiereService;
