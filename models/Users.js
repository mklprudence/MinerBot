module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        total_login: {
            type: DataTypes.STRING,
            defaultValue: '0',
            allowNull: false,
        },
        last_session_start:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0',
        },
        last_session_end:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0',
        },
        current_session_start:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0',
        },
        login_status:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        timestamps: false,
    });
};