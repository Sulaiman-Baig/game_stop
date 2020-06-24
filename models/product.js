module.exports = (sequelize, type) => {
    return sequelize.define("product", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        name: type.STRING,
        price: type.STRING,
        quantity: type.INTEGER,
        description: type.STRING,
        imageUrl: type.STRING
    });
};