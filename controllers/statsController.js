const chargeService = require("../services/chargeService");
const classeService = require("../services/classeService");
const matiereService = require("../services/matiereService");
const niveauService = require("../services/niveauService");
const UserService = require("../services/user.service");

class statsController {
    static getKpi = async (req, res, next) => {
        try {
            let result = {
                teachersCount: (await UserService.count({ role: "TEACHER" }))
                    .value,
                studentsCount: (await UserService.count({ role: "STUDENT" }))
                    .value,
                classesCount: (await classeService.count()).value,
                levelsCount: (await niveauService.count()).value,
                femaleStudentsCount: (
                    await UserService.count({ gender: "FEMALE" })
                ).value,
                maleStudentsCount: (await UserService.count({ gender: "MALE" }))
                    .value,
                studentsCountByMonth: await UserService.countByDate(
                    {
                        role: "STUDENT",
                    },
                    "%Y-%m"
                ),
                totalCharges: (await chargeService.amountSum()).value,
                totalChargesByMonth: await chargeService.amountSumByDate(
                    {},
                    "%Y-%m"
                ),
                subjectsCount: (await matiereService.count()).value,
            };
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
}

module.exports = statsController;
