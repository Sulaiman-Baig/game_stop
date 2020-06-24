const http_status_codes = require('http-status-codes');
const {
    Product,
    SubCategory
} = require('../database/database');
module.exports = {

    async createSubCategory(req, res, next) {
        try {
            const categoryId = req.params.categoryId;
            const {
                _name,
                _categoryName,
                _imageUrl,
                // _discription                
            } = req.body;
            const subCategory = await SubCategory.create({
                name: _name,
                categoryName: _categoryName,
                imageUrl: _imageUrl,
                categoryId: categoryId
                // _discription:_discription
            });
            return res.status(http_status_codes.CREATED).json(subCategory);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating SubCategory"
            });
        }
    },

    async updateSubCategory(req, res, next) {
        try {
            const subCategoryId = req.params.id;
            const {
                _name,
                _categoryName,
                _imageUrl
            } = req.body;

            const subCategory = await SubCategory.update({
                name: _name,
                categoryName: _categoryName,
                imageUrl: _imageUrl
            }, {
                where: {
                    id: subCategoryId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'SubCategory Updated Successfully'
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating SubCategory"
            });
        }
    },

    async getSubCategory(req, res, next) {
        try {
            subCategoryId = req.params.id;
            const subCategory = await SubCategory.findOne({
                where: {
                    id: subCategoryId
                }
            });
            return res.status(http_status_codes.OK).json(subCategory);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching SubCategory"
            });
        }
    },

    async getAllSubCategories(req, res, next) {
        try {
            const subCategory = await SubCategory.findAll();
            return res.status(http_status_codes.OK).json(subCategory);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All SubCategory"
            });
        }
    },


    async deleteSubCategory(req, res, next) {
        try {
            subCategoryId = req.params.id;
            const subCategory = await SubCategory.destroy({
                where: {
                    id: subCategoryId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'SubCategory Deleted Successfully'
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting SubCategory"
            });
        }
    },

    async getAllProducts(req, res, next) {
        try {
            const products = await Product.findAll({
                where: {subcategoryId:req.params.subcatId}
            }, {
                include: {
                    all: true
                }
            });
            return res.status(http_status_codes.OK).json(products);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Products"
            });
        }
    },
};