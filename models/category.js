module.exports = (sequelize, type) => {
    return sequelize.define("category", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        eng_title: type.STRING,
        arbic_title: type.STRING,
        imageUrl: type.STRING,

    });   
};