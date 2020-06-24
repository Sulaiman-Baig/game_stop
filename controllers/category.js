const http_status_codes = require('http-status-codes');
const {

    Category,
    SubCategory
    } = require('../database/database');
module.exports = {

    async createCategory(req, res, next) {
        try {
            const adminId = req.params.adminId;

            const {
                _name
            } = req.body;

            const category = await Category.create({
                name: _name,
                adminId: adminId
            });
            return res.status(http_status_codes.CREATED).json(category);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Category"
            });
        }
    },

    async updateCategory(req, res, next) {
        try {
            const {
                _name
            } = req.body;
            categoryId = req.params.id;
            const category = await Category.update({
                name: _name
            }, {
                where: {
                    id: categoryId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Category Updated Successfully'
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Category"
            });
        }
    },

    async getCategory(req, res, next) {
        try {
            categoryId = req.params.id;
            const category = await Category.findOne({
                where: {
                    id: categoryId
                }
            });
            return res.status(http_status_codes.OK).json(category);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Category"
            });
        }
    },

    async getAllCategories(req, res, next) {
        try {
            const category = await Category.findAll();
            return res.status(http_status_codes.OK).json(category);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Category"
            });
        }
    },


    async deleteCategory(req, res, next) {
        try {
            categoryId = req.params.id;
            const category = await Category.destroy({
                where: {
                    id: categoryId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Category Deleted Successfully'
            });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Category"
            });
        }
    },
    async getAllSubCategories(req, res, next) {
        try {
            let catid = req.params.catId
            const subCategories = await SubCategory.findAll({
                where: {categoryId:catid}
            }, 
            // {
            //     include: {
            //         model: SubCategory
            //     }
            // }
            );
            return res.status(http_status_codes.OK).json(subCategories);
        } catch (err) {
            console.log(res)
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Sub-Category"
            });
        }
    },
};