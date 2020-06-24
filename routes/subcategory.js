var express = require('express');
var router = express.Router();
const subCategoryController = require('../controllers/subcategory');


router.post('/create/:categoryId', subCategoryController.createSubCategory );
router.post('/update/:id', subCategoryController.updateSubCategory );
router.delete('/delete/:id', subCategoryController.deleteSubCategory );
router.get('/get/:id', subCategoryController.getSubCategory );
router.get('/getall', subCategoryController.getAllSubCategories );
router.get('/getallproduct/:subcatId', subCategoryController.getAllProducts);


module.exports = router;