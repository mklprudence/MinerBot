const Sequelize = require('sequelize');

/* const sequelize = new Sequelize('epiz_21949064_MKLBot', 'epiz_21949064', 'mklprudence', {
    host: 'sql210.epizy.com',
    dialect: 'mysql',
    logging: false,
});*/

const sequelize = new Sequelize('postgres://iabqwsabhctrbv:0ab16a079b652c0a05beccdf090ae4cae3a5c8c29448044c894117cd113e8f26@ec2-54-83-204-6.compute-1.amazonaws.com:5432/d79ntsduij03ps', {
    logging: false,
});

const Users = sequelize.import('models/Users');

Users.prototype.login = async function(uptime) {
    if (!this.login_status) {
        this.login_status = true;
        this.current_session_start = String(new Date().getTime());
        return this.save();
    }
    else {
        this.total_login = String(Number(this.total_login) + new Date().getTime() - Number(this.current_session_start) - uptime);
        this.last_session_start = this.current_session_start;
        this.last_session_end = String(new Date().getTime() - uptime);
        this.current_session_start = String(new Date().getTime());
        console.log(`${this.user_id} did not logout before login`);
        return this.save();
    }
};

Users.prototype.logout = async function(uptime) {
    if (this.login_status) {
        this.login_status = false;
        this.total_login = String(Number(this.total_login) + new Date().getTime() - Number(this.current_session_start));
        this.last_session_start = this.current_session_start;
        this.last_session_end = String(new Date().getTime());
        return this.save();
    }
    else {
        console.log(`${this.user_id} did not login before logout`);
        this.total_login = String(Number(this.total_login) + uptime);
        this.last_session_end = String(new Date().getTime());
        this.last_session_start = String(new Date().getTime() - uptime);
        return this.save();
    }
};

module.exports = { Users };