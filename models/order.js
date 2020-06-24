
module.exports = (sequelize, type) => {
    return sequelize.define("order", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        username: type.STRING,
        useremail: type.STRING,
        userphone: type.INTEGER,
        useraddress: type.STRING,
        userzipcode: type.STRING,
        usercity: type.STRING,
        usercountry: type.STRING



    });
};