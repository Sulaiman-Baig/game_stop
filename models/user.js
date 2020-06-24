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
        address: type.STRING,
        zipcode: type.STRING,
        country: type.STRING,
        city: type.STRING,
        password: type.STRING,
        imageUrl: type.STRING,
        isBlocked: type.BOOLEAN,
    });
   
};