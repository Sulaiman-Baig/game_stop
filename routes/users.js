var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

 router.post('/create' , userController.createUser);
 router.post('/signin' , userController.signinUser);
 router.post('/update/:id' , userController.updateUser);
 router.post('/updatepassword/:id' , userController.updatePassword);
 router.post('/resetpassword/:id' , userController.resetPassword);
 router.post('/mailsend' , userController.forgotPassword);
 router.get('/getbyId/:id' , userController.getById);
 router.get('/getall' , userController.getAll);
 router.post('/socailLogin' , userController.socailLogin);
module.exports = router;
