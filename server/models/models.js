const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Note = sequelize.define("note", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  body: { type: DataTypes.STRING },
});

const Folder = sequelize.define("folder", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

const ShareNote = sequelize.define("sharenote", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  authorname: { type: DataTypes.STRING },
  authorid: { type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING },
  body: { type: DataTypes.STRING },
});

User.hasMany(Folder);
Folder.belongsTo(User);

Folder.hasMany(Note);
Note.belongsTo(Folder);

User.hasMany(ShareNote);
ShareNote.belongsTo(User);

module.exports = {
  User,
  Folder,
  Note,
  ShareNote,
};
