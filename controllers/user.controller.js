const UserService = require("../services/user.service");
const User = require("../models/User/User");
const { Op } = require("sequelize");
const ROLES = require("../config/roles");
// TODO : handle cases when find might return empty array or not obj
// TODO : ADD Service layer & clean up controller

class userController {
    static getAll = async (_, res, next) => {
        try {
            return res.status(200).json(await UserService.findAll());
        } catch (err) {
            next(err);
        }
    };
    static getTeachers = async (_, res, next) => {
        try {
            return res
                .status(200)
                .json(await UserService.findAll({ teachers: true }));
        } catch (err) {
            next(err);
        }
    };
    static getAdmins = async (_, res, next) => {
        console.log("------------------------------------------");
        try {
            return res
                .status(200)
                .json(await UserService.findAll({ admins: true }));
        } catch (err) {
            next(err);
        }
    };
    static getStudents = async (_, res, next) => {
        try {
            return res
                .status(200)
                .json(await UserService.findAll({ students: true }));
        } catch (err) {
            next(err);
        }
    };

    static getStudentsByClasseId = async (req, res, next) => {
        const id = req.params.id;
        try {
            return res
                .status(200)
                .json(await UserService.findStudentsByClasseId(id));
        } catch (err) {
            next(err);
        }
    };

    static create = async (req, res, next) => {
        const {
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
            birthDate,
            role,
            gender,
            salary,
            classeId,
        } = req.body;
        const newUser = {
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
            birthDate,
            image: req.files.image,
            classeId,
            gender,
        };
        if (role) {
            newUser.role = role;
            newUser.salary = salary;
        }

        try {
            await UserService.create(newUser);

            return res.status(201).json({
                message: `${newUser.firstname} created.Please confirm your account.`,
            });
        } catch (err) {
            console.log(err);

            next(err);
        }
    };

    static getOne = async (req, res, next) => {
        const id = req.params.id;
        try {
            const user = await UserService.findOne(id);
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    };

    static update = async (req, res, next) => {
        const {
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
            birthDate,
            salary,
            gender,
        } = req.body;
        let updatedUser = {
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
            birthDate,
            gender,
        };
        if (salary) {
            updatedUser.salary = salary;
        }
        console.log(req.files);
        if (req.files !== null) {
            updatedUser.image = req.files.image;
        }
        const id = req.params.id;
        try {
            updatedUser = UserService.updateOne(id, updatedUser);
            return res.status(204).json({ success: true, updatedUser });
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
    static delete = async (req, res, next) => {
        const id = req.params.id;
        try {
            await UserService.deleteOne(id);
            return res
                .status(200)
                .json({ success: true, message: `user ${id} deleted` });
        } catch (err) {
            next(err);
        }
    };
    static addClassToUser = async (req, res, next) => {
        const id = req.params.id; //user id

        const { classeId } = req.body;
        try {
            await UserService.addClassToUser(id, classeId);
            return res
                .status(200)
                .json({ success: true, message: `user added to class` });
        } catch (error) {
            next(error);
        }
    };
    static removeClassToUser = async (req, res, next) => {
        const id = req.params.id; //user id
        const { classeId } = req.body;
        try {
            await UserService.removeClassToUser(id, classeId);
            return res
                .status(200)
                .json({ success: true, message: `user removed from class` });
        } catch (error) {
            next(error);
        }
    };
    static updateSalary = async (req, res, next) => {
        const id = req.params.id;
        const { salary } = req.body;
        try {
            await UserService.updateSalary(id, salary);
            return res
                .status(200)
                .json({ success: true, message: `teacher salary updated` });
        } catch (error) {
            next(error);
        }
    };
    static StudentCount = async (req, res, next) => {
        //console.log('test');
        const studentC = await User.count({ where: { role: ROLES.STUDENT } });
        console.log(studentC);
        if (!studentC) {
            res.status(500).json({ success: false });
        }

        res.status(200).json(studentC);
    };
    static TeacherCount = async (req, res, next) => {
        console.log("test");
        const teachertC = await User.count({
            where: { role: { [Op.eq]: ROLES.TEACHER } },
        });
        //console.log(studentC);
        if (!teachertC) {
            res.status(500).json({ success: false });
        }

        res.status(200).json(teachertC);
    };
    static AdminCount = async (req, res, next) => {
        console.log("test");
        const adminC = await User.count({
            where: { role: { [Op.eq]: ROLES.ADMIN } },
        });
        //console.log(studentC);
        if (!adminC) {
            res.status(500).json({ success: false });
        }

        res.status(200).json(adminC);
    };
}

module.exports = userController;
