const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// get home page
exports.getIndex = (req, res)=>{
    res.render('admin/home',{
        pageTitle: 'Home'
    });
}

// the login page
exports.getLogin = (req, res)=>{
    res.render('admin/login',{
        pageTitle: 'Login'
    });
}

// the registration page
exports.getRegistration = (req, res)=>{
    res.render('admin/register',{
        pageTitle: 'Register'
    });
}

// the registration post request
exports.postRegistration = (req, res)=>{
    // console.log(req.body);

    const {name, email, password, password2} = req.body;
    let errors = [];

    // check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    // check passwords match
    if(password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }

    // check password length
    if(password.length < 6){
        errors.push({msg: 'Password should be at least 8 characters'});
    }

    if(errors.length > 0){
        res.render('admin/register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        // validation passed
        Admin.findOne({email: email}).then(admin =>{
            if(admin){
                // user already exists
                errors.push({msg: 'Email is already registered'})
                res.render('admin/register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newAdmin = new Admin({
                    name,
                    email,
                    password
                });

                // hash[encryping] password
                bcrypt.genSalt(10, (err, salt)=>
                    bcrypt.hash(newAdmin.password, salt, (err, hash)=>{
                        if(err) throw err;

                        // set new User
                        newAdmin.password = hash;

                        // save new admin
                        newAdmin.save()
                            .then(admin =>{
                                req.flash('success_msg', 'You are now registered and can proceed to sign in');
                                res.redirect('login');
                            })
                            .catch(error =>{
                                console.log(error);
                            }
                        );
                }));
            }

        }).catch(error =>{
            console.log(error);
        });
    }
}

// the login post
exports.postLogin = (req, res, next)=>{
    // requesting login
    passport.authenticate('local',{
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);
}
