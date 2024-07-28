require("dotenv").config();
const { Sequelize } = require('sequelize');
const databaseUrl = process.env.psql;
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
});
sequelize.authenticate()
    .then(() => console.log('Database connection established.'))
    .catch(err => console.error('Unable to connect to the database:', err));
module.exports = {
    sequelize,
    Sequelize,
};
