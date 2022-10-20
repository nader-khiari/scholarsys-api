const AgentRole = require("./models/AgentRole");
const User = require("./models/User/User");

AgentRole.belongsToMany(User, {
    through: "xref_user_agent_role",
    onDelete: "CASCADE",
});
User.belongsToMany(AgentRole, {
    through: "xref_user_agent_role",
    onDelete: "CASCADE",
});
