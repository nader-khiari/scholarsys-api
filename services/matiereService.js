const sequelize = require("sequelize");
const Matiere = require("../models/matiere");

class matiereService {
    //#region stats
    static async count(options) {
        return await Matiere.findOne({
            where: options ?? {},
            attributes: [[sequelize.fn("COUNT", "*"), "value"]],
            raw: true,
            nest: true,
        });
    }
    //#endregion
}

module.exports = matiereService;
