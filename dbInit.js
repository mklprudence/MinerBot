const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql12229851', 'sql12229851', 'XnBWZXbMZ7', {
    host: 'sql12.freemysqlhosting.net',
    dialect: 'mysql',
    logging: false,
});

sequelize.import('models/Users');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);