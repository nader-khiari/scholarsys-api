const sequelize = require("../config/db.config");
const Sequelize = require("sequelize");

const AgentRole = sequelize.define(
    "AgentRole",
    {
        name: { type: Sequelize.STRING, allowNull: false },
        permissions: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue("permissions").split(";");
            },
            set(val) {
                return this.setDataValue("permissions", val.join(";"));
            },
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
);

module.exports = AgentRole;
