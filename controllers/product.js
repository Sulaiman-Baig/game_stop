const http_status_codes = require('http-status-codes');
const {

    Product
} = require('../database/database');
module.exports = {

    async createProduct(req, res, next) {
        try {
            const subcategoryId = req.params.subcategoryId
            const {
                _name,
                _price,
                _quantity,
                _description,
                _imageUrl
            } = req.body;
            const product = await Product.create({
                name: _name,
                price: _price,
                quantity: _quantity,
                description: _description,
                imageUrl: _imageUrl,
                subcategoryId: subcategoryId
            });
            return res.status(http_status_codes.CREATED).json(product);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Product"
            });
        }
    },

    async updateProduct(req, res, next) {
        try {
            const productId = req.params.id
            const {
                _name,
                _price,
                _quantity,
                _description,
                _imageUrl
            } = req.body;

            const product = await Product.update({
                name: _name,
                price: _price,
                quantity: _quantity,
                description: _description,
                imageUrl: _imageUrl
            }, {
                where: {
                    id: productId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Product Updated Successfully'
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Product"
            });
        }
    },

    async getProduct(req, res, next) {
        try {
            productId = req.params.id;
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
            return res.status(http_status_codes.OK).json(product);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Product"
            });
        }
    },

    async getAllProducts(req, res, next) {
        try {
            const products = await Product.findAll();
            return res.status(http_status_codes.OK).json(products);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Product"
            });
        }
    },


    async deleteProduct(req, res, next) {
        try {
            productId = req.params.id;
            const product = await Product.destroy({
                where: {
                    id: productId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Product Deleted Successfully'
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Product"
            });
        }
    },
  

};