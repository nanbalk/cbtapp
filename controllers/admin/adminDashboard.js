const Admin = require('../../models/Admin');

// rendering teh dashboard
exports.getDashboard = (req, res)=>{
    res.render('admin/dashboard',{
        name: req.user.email
    });
}

// logout post
exports.postLogout = (req, res)=>{
    req.logout();
    req.flash('success_msg', 'You have successfully logged out');
    res.redirect('/admin/login');
}