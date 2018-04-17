const Sequelize = require('sequelize');

const sequelize = new Sequelize('epiz_21949064_MKLBot', 'epiz_21949064', 'mklprudence', {
    host: 'sql210.epizy.com',
    dialect: 'mysql',
    logging: false,
});

sequelize.import('models/Users');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);