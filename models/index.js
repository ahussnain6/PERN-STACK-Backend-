const { Sequelize } = require('sequelize');
const config = require('../config/config');
// Load environment variables
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];
const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
    host: configEnv.host,
    dialect: configEnv.dialect,
    logging: configEnv.logging,
});
sequelize.authenticate()
    .then(() => console.log('Database connection established.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = {
    sequelize,
    Sequelize,
};
