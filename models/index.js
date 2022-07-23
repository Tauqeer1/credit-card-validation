const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';

const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected successfully!');
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  });

sequelize.sync({ alter: true });

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
