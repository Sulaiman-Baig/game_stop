var express = require('express');
var router = express.Router();
const orderController = require('../controllers/order');


router.post('/create/:userId', orderController.createOrder );
router.get('/getall', orderController.getAllOrders );
router.get('/getall/:id', orderController.getAllOrdersById );
router.get('/getorders/:id', orderController.getAllOrdersByUser_Id );


module.exports = router;