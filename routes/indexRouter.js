const express = require("express");

const sequelize = require("../config/db.config");

const Token = require("../services/Token.service");

const errorHandler = require("../middlewares/errorHandler.middleware");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const verifyRole = require("../middlewares/isAuthorized.middleware");

const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const seanceRouter = require("./seanceRouter");
const emploiRouter = require("./emploiRouter");
const attendanceRouter = require("./attendanceRouter");

const niveauRouter = require("./niveau-routes");
const classeRouter = require("./classe-routes");
const formationRouter = require("./formation-routes");
const chargeRouter = require("./charge-routes");
const salleRouter = require("./salle-routes");
const matiereRouter = require("./matiere-routes");
const noteRouter = require("./note-routes");

const router = express.Router();

router.use(authRouter);
router.use("/user", userRouter);
router.use("/seance", seanceRouter);
router.use("/emploi", emploiRouter);
router.use("/attendance", attendanceRouter);

router.use("/", niveauRouter);
router.use("/", classeRouter);
router.use("/", formationRouter);
router.use("/", chargeRouter);
router.use("/", salleRouter);
router.use("/", matiereRouter);
router.use("/", noteRouter);

// test route for isAuthenticated middleware
router.get("/private", isAuthenticated, (req, res) => {
    return res.sendStatus(200);
});

// test route for revoking token for userId 1
router.get("/revoke", (_, res) => {
    Token.revokeRefreshTokens(1);
    res.send({ revoked: true });
});

// authorization & authentication works
router.get(
    "/test",
    isAuthenticated,
    verifyRole("TEACHER", "STUDENT"),
    (req, res) => {
        res.sendStatus(200);
    }
);

router.use(errorHandler);

router.get("/proc", async (req, res, next) => {
    try {
        // testing fn
        const p = await sequelize.query("CALL test();");

        return res.json(p);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
