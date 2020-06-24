module.exports = (sequelize, type) => {
    return sequelize.define("subcategory", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        name: type.STRING,
        categoryName: type.STRING,
        imageUrl: type.STRING
    });
};