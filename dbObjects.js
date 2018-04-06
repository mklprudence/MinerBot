const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql12229851', 'sql12229851', 'XnBWZXbMZ7', {
    host: 'sql12.freemysqlhosting.net',
    dialect: 'mysql',
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