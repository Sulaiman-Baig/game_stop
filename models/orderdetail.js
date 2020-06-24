module.exports = (sequelize, type) => {
    return sequelize.define("orderdetail", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        productname: type.STRING,
        imageurl: type.STRING,
        price: type.STRING,
        quantity: type.INTEGER,
        description: type.STRING,
    });
};