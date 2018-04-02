const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql12229851', 'sql12229851', 'XnBWZXbMZ7', {
    host: 'sql12.freemysqlhosting.net/',
    dialect: 'mysql',
    // logging: false,
});

const Users = sequelize.import('models/Users');

Users.prototype.login = async function() {
    if (!this.login_status) {
        this.login_status = true;
        this.current_session_start = new Date().getTime();
        return Users.save();
    }
    else {
        console.log(`${this.user_id} did not logout before login`);
    }
};

Users.prototype.logout = async function(uptime) {
    if (this.login_status) {
        this.login_status = false;
        this.total_login += (new Date().getTime() - this.current_session_start);
        this.last_session_start = this.current_session_start;
        this.last_session_end = new Date().getTime();
        return Users.save();
    }
    else {
        console.log(`${this.user_id} did not login before logout`);
        this.total_login += uptime;
        this.last_session_end = new Date().getTime();
        this.last_session_start = new Date().getTime() - uptime;
        return Users.save();
    }
};

module.exports = { Users };