module.exports = (sequelize, type) => {
    return sequelize.define("user", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        name: type.STRING,
        email: type.STRING,
        gender: type.STRING,
        password: type.STRING,
        description: type.STRING,
        profile_pic: type.STRING,
        cover_pic: type.STRING

    });
};