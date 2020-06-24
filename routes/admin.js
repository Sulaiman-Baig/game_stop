var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admin');

 router.post('/create' , adminController.createAdmin);
 router.post('/signin' , adminController.signinAdmin);
 router.post('/update/:id' , adminController.updateAdmin);
 router.post('/updatepassword/:id' , adminController.updatePassword);
 router.post('/resetpassword/:id' , adminController.resetPassword);
 router.post('/mailsend' , adminController.forgotPassword);
 router.get('/getbyId/:id' , adminController.getById);
 router.get('/getall' , adminController.getAll);
module.exports = router;
