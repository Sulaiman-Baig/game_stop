const http_status_codes = require('http-status-codes');
const {

    Order,
    OrderDetail
} = require('../database/database');
module.exports = {

    async createOrder(req, res, next) {
        try {
            const userId = req.params.userId;

            const {
                _username,
                _useremail,
                _userphone,
                _useraddress,
                _userzipcode,
                _usercountry,
                _usercity,
                _products

            } = req.body;
            const order = await Order.create({
                username: _username,
                useremail: _useremail,
                userphone: _userphone,
                useraddress: _useraddress,
                userzipcode: _userzipcode,
                usercountry: _usercountry,
                usercity: _usercity,
                // subcategoryId: subcategoryId,
                userId: userId,

            });
            _products.forEach(async product => {
                await OrderDetail.create({

                    productname: product.productname,
                    imageurl: product.imageurl,
                    price: product.price,
                    quantity: product.quantity,
                    description: product.description,
                    orderId: order.id,
                    productId: product.productId
                });
            });

            return res.status(http_status_codes.CREATED).json({message:'okay',order:order});
        } catch (err) {
            console.log(err)
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Order",
                err:err
            });
        }
    },
    async getAllOrders(req, res, next) {
        try {
            const order = await Order.findAll();
            return res.status(http_status_codes.OK).json(order);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Product"
            });
        }
    },
    async getAllOrdersById(req, res, next) {
        try {
            const order = await OrderDetail.findAll({
                where: {
                    orderId: req.params.id
                }
            });
            return res.status(http_status_codes.OK).json(order);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Product"
            });
        }
    },
    async getAllOrdersByUser_Id(req, res, next) {
        try {
            const order = await Order.findAll({
                where: {
                    userId: req.params.id
                }
            });
            console.log('============' ,req.params.id,order,'==========')
            return res.status(http_status_codes.OK).json(order);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Product"
            });
        }
    },
};