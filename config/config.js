module.exports = {
    development: {
        username: process.env.dbusername,
        password: process.env.dbpass,
        database: process.env.db,
        host: 'localhost',
        dialect: 'postgres',
        logging: false,  // Set to true to see SQL queries
    },
    test: {
        username: process.env.dbusername,
        password: process.env.dbpass,
        database: process.env.db,
        host: 'localhost',
        dialect: 'postgres',
    },
    production: {
        username: process.env.dbusername,
        password: process.env.dbpass,
        database: process.env.db,
        host: 'localhost',
        dialect: 'postgres',
    },
};
  
