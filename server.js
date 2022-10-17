require("dotenv").config();
const express = require("express");
// const cluster = require("cluster");
// const { cpus } = require("os");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/db.config");
const indexRouter = require("./routes/indexRouter");
const logger = require("morgan");

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
app.use("/api/static", express.static(path.join(__dirname, "public")));

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
        //await sequelize.sync();
    } catch (err) {
        console.log(err);
    }
    console.log(`Listening on ${PORT} | ${process.pid}`);
});

module.exports = app;
