const http_status_codes = require('http-status-codes');
const {

    Category
} = require('../database/database');
module.exports = {

    async createCategory(req, res, next) {
        try {

            const {
                eng_title,
                arbic_title,
                imageUrl
            } = req.body;

            const category = await Category.create({
                eng_title: eng_title,
                arbic_title: arbic_title,
                imageUrl: imageUrl,
                categoryId: null
            });
            return res.status(http_status_codes.CREATED).json({ message: 'Category created successfully' });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Category"
            });
        }
    },

    async createSubCategory(req, res, next) {
        try {
            const {
                eng_title,
                arbic_title,
                imageUrl
            } = req.body;
            categoryId = req.params.id;
            const category = await Category.create({
                eng_title: eng_title,
                arbic_title: arbic_title,
                imageUrl: imageUrl,
                categoryId: categoryId
            });
            return res.status(http_status_codes.CREATED).json({ message: 'SubCategory created successfully' });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Category"
            });
        }
    },

    async updateCategory(req, res, next) {
        try {
            const {
                eng_title,
                arbic_title,
                imageUrl
            } = req.body;

            categoryId = req.params.id;

            const category = await Category.update({
                eng_title: eng_title,
                arbic_title: arbic_title,
                imageUrl: imageUrl
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
            const categories = await Category.findAll();
            return res.status(http_status_codes.OK).json(categories);
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
            let catId = req.params.catId
            const subCategories = await Category.findAll({
                where: { categoryId: catid }
            });
            return res.status(http_status_codes.OK).json(subCategories);
        } catch (err) {
            console.log(res)
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Sub-Category"
            });
        }
    },
};