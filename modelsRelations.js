const AgentRole = require("./models/AgentRole");
const Attendance = require("./models/Attendance");
const Classe = require("./models/classe");
const Emploi = require("./models/Emploi/Emploi");
const Formation = require("./models/formation");
const Matiere = require("./models/matiere");
const Niveau = require("./models/niveau");
const Note = require("./models/note");
const Paiement = require("./models/paiement");
const Salle = require("./models/salle");
const Seance = require("./models/Seance/Seance");
const User = require("./models/User/User");

//#region relation between agents and their roles
AgentRole.belongsToMany(User, {
    through: "xref_user_agent_role",
    onDelete: "CASCADE",
});
User.belongsToMany(AgentRole, {
    through: "xref_user_agent_role",
    onDelete: "CASCADE",
});
//#endregion

//#region relation between teachers and their class sessions
User.hasMany(Seance, {
    foreignKey: "teacherId",
});
Seance.belongsTo(User, {
    foreignKey: "teacherId",
});
//#endregion

//seance belongs to admin
Seance.belongsTo(User, {
    foreignKey: "adminId",
});

// admin
User.hasMany(Emploi, {
    foreignKey: "adminId",
});

// table emploi contains adminId created EMPLOI
Emploi.belongsTo(User, {
    foreignKey: "adminId",
});

// could cause probs
User.hasMany(Seance, {
    foreignKey: "adminId",
});

User.belongsToMany(Classe, {
    through: "teacher_classes",
    foreignKey: "teacherId",
});
Classe.belongsToMany(User, {
    through: "teacher_classes",
    foreignKey: "classeId",
});

User.hasMany(Note, {
    foreignKey: "teacherId",
});
Note.belongsTo(User, {
    foreignKey: "teacherId",
});

User.hasMany(Note, {
    foreignKey: "studentId",
});
Note.belongsTo(User, {
    foreignKey: "studentId",
});

Seance.hasMany(Attendance, {
    foreignKey: "seanceId",
});
Attendance.belongsTo(Seance, {
    foreignKey: "seanceId",
});

User.hasMany(Attendance, {
    foreignKey: "studentId",
});
Attendance.belongsTo(User, {
    foreignKey: "studentId",
});

Matiere.hasMany(Seance);
Seance.belongsTo(Matiere);

Formation.hasMany(Niveau, {
    foreignKey: "formationId",
});
Niveau.belongsTo(Formation);

Matiere.hasMany(Note);
Note.belongsTo(Matiere);

Niveau.hasMany(Classe, {
    foreignKey: "niveauId",
});
Classe.belongsTo(Niveau);

Niveau.hasMany(Matiere);
Matiere.belongsTo(Niveau);

User.hasMany(Paiement, {
    foreignKey: "adminId",
});
Paiement.belongsTo(User, {
    foreignKey: "adminId",
});
User.hasMany(Paiement, {
    foreignKey: "studentId",
});
Paiement.belongsTo(User, {
    foreignKey: "studentId",
});

Salle.hasMany(Seance);
Seance.belongsTo(Salle);

Emploi.hasMany(Seance);
Seance.belongsTo(Emploi);

Classe.hasMany(Emploi);
Emploi.belongsTo(Classe);
