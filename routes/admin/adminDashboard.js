var express = require('express');
var router = express.Router();
var adminDashboard = require('../../controllers/admin/adminDashboard');
const {ensureAuthenticated} = require('../../config/auth');


// dashboard
router.get('/dashboard', ensureAuthenticated, adminDashboard.getDashboard);
router.get('/logout', adminDashboard.postLogout);

module.exports = router;
