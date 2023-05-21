const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.dbName,
  process.env.dbUserName,
  process.env.dbPassword,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.biodata = require("./biodata_model")(sequelize, Sequelize);

module.exports = db;
