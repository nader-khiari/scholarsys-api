const AgentRole = require("../models/AgentRole");
const ErrorResponse = require("./../util/helpers/ErrorResponse");

class AgentRoleService {
    static async findAll() {
        const result = await AgentRole.findAll();
        return result;
    }

    static async create(data) {
        const result = await AgentRole.create(data);
        return result;
    }

    static async deleteOne(id) {
        const result = await AgentRole.destroy({
            where: {
                id: id,
            },
        });
        return result;
    }

    static async updateOne(id, data) {
        const result = await AgentRole.update(data, {
            where: {
                id,
            },
        });
        return result;
    }
}

module.exports = AgentRoleService;
