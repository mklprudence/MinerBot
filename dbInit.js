const Sequelize = require('sequelize');

/* const sequelize = new Sequelize('epiz_21949064_MKLBot', 'epiz_21949064', 'mklprudence', {
    host: 'sql210.epizy.com',
    dialect: 'mysql',
    logging: false,
});*/

const sequelize = new Sequelize('postgres://iabqwsabhctrbv:0ab16a079b652c0a05beccdf090ae4cae3a5c8c29448044c894117cd113e8f26@ec2-54-83-204-6.compute-1.amazonaws.com:5432/d79ntsduij03ps');

sequelize.import('models/Users');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);