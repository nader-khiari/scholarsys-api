require("dotenv").config();
const express = require("express");
// const cluster = require("cluster");
// const { cpus } = require("os");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const sequelize = require("./config/db.config");
const indexRouter = require("./routes/indexRouter");
const logger = require("morgan");
require("./modelsRelations");

let usersImagesPath = path.join(process.cwd(), "static", "users_images");
if (!fs.existsSync(usersImagesPath)) {
    fs.mkdirSync(usersImagesPath, { recursive: true });
}

const PORT = process.env.PORT || 8000;

const app = express();

app.use(logger("dev"));
app.use(
    cors({
        origin: process.env.FRONT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/static", express.static(path.join(process.cwd(), "static")));

app.use("/api", indexRouter);

// if (cluster.isMaster) {
//     const cpuCount = cpus().length;

//     for (let i = 0; i < cpuCount; i++) {
//         // console.log(process.pid);
//         cluster.fork();
//     }

//     cluster.on("exit", () => {
//         cluster.fork();
//     });
// } else {
//     app.listen(PORT, async () => {
//         try {
//             //await sequelize.sync({ force: true });
//              //await sequelize.sync();
//         } catch (err) {
//             console.log(err);
//         }
//         console.log(`Listening on ${PORT} | ${process.pid}`);
//     });
// }

app.listen(PORT, async () => {
    try {
        //await sequelize.sync({ force: true });
        // await sequelize.sync({ alter: true });
    } catch (err) {
        console.log(err);
    }
    console.log(`Listening on ${PORT} | ${process.pid}`);
});

module.exports = app;
