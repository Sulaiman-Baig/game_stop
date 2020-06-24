var express = require('express');
var router = express.Router();
const productController = require('../controllers/product');


router.post('/create/:subcategoryId', productController.createProduct );
router.post('/update/:id', productController.updateProduct );
router.delete('/delete/:id', productController.deleteProduct );
router.get('/get/:id', productController.getProduct );
router.get('/getall', productController.getAllProducts );


module.exports = router;