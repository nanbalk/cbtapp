var express = require('express');
var router = express.Router();
var adminController = require('../../controllers/admin/admin');



/* GET home page. */
router.get('/', adminController.getIndex);
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.get('/register', adminController.getRegistration);
router.post('/register', adminController.postRegistration);





module.exports = router;
