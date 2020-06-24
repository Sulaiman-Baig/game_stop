module.exports = (sequelize, type) => {
    return sequelize.define("product_images", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        imageUrl: type.STRING,
        
    });    
};