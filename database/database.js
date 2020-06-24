const Sequelize = require('sequelize');

// MODELS
const AdminModel = require("../models/admin");
const UserModel = require("../models/user");
const CategoryModel = require("../models/category");
const SubCategoryModel = require("../models/subcategory");
const ProductModel = require("../models/product");
const OrderModel = require("../models/order");
const OrderDetailModel = require("../models/orderdetail");





// SEQUELIZE CONNECTION 
const sequelize = new Sequelize("", "root", "root1234", {
host: "localhost",
dialect: "mysql",
// operatorsAliases: false,
pool: {
max: 10,
min: 0,
acquire: 30000,
idle: 10000
}
});

// MODELS CREATIONS WITH SWQUELIZE
const User = UserModel(sequelize, Sequelize);
const Admin = AdminModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const SubCategory = SubCategoryModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const OrderDetail = OrderDetailModel(sequelize, Sequelize);




// RELATIONS

Category.belongsTo(Admin);
Admin.hasMany(Category, { foreignKey: 'adminId', sourceKey: 'id' });

SubCategory.belongsTo(Category);
Category.hasMany(SubCategory, { foreignKey: 'categoryId', sourceKey: 'id' });

Product.belongsTo(SubCategory);
SubCategory.hasMany(Product, { foreignKey: 'subcategoryId', sourceKey: 'id' });

Order.belongsTo(User);
User.hasMany(Order, { foreignKey: 'userId', sourceKey: 'id' });

OrderDetail.belongsTo(Order);
Order.hasMany(OrderDetail, { foreignKey: 'orderId', sourceKey: 'id' });

OrderDetail.belongsTo(Product);
Product.hasMany(OrderDetail, { foreignKey: 'productId', sourceKey: 'id' });





// TO UPDATE SCHEMA
sequelize.sync({ alter: true }).then(() => {
console.log(`Database & tables created!`);
});



// EXPORT MODELS
module.exports = {
User,
Admin,
Category,
SubCategory,
Product,
Order,
OrderDetail


};