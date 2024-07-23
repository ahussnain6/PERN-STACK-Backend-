const { sequelize } = require('./models/index');
const User = require('./models/user');
const Book = require('./models/Book');

(async () => {
    try {
        await sequelize.sync({ force: true });  // Use { force: true } to drop tables if they already exist
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();
