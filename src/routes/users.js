var express = require('express');
var router = express.Router();

const UsersController = require('./controllers/users.controller')

const verifyAcessToken = require('./middlewares/verifyAccessToken.middleware') 
const verifyOwner = require('./middlewares/verifyOwner.middleware') 

const onlyAllowsOwner = [verifyAcessToken, verifyOwner]
//Login
router.post('/login', UsersController.bindMethod('login'));

router.get('/', verifyAcessToken, UsersController.bindMethod('index'));
router.get('/:id', verifyAcessToken, UsersController.bindMethod('show'));
router.post('/', verifyAcessToken, UsersController.bindMethod('store'));
router.patch('/:id', onlyAllowsOwner, UsersController.bindMethod('update'));
router.delete('/:id', onlyAllowsOwner, UsersController.bindMethod('remove'));

module.exports = router;
