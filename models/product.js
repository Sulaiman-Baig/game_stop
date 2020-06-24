module.exports = (sequelize, type) => {
    return sequelize.define("product", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        eng_title: type.STRING,
        arbic_title: type.STRING,
        quantity: type.INTEGER,
        eng_description: type.STRING,
        arbic_description: type.STRING,
        price: type.STRING,
        arbic_description: type.STRING,
        review_stars: type.INTEGER,
    });    
};