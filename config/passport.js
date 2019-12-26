const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// user model
const Admin = require('../models/Admin');

module.exports = (passport)=>{
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
            // Match User
            Admin.findOne({email: email})
                .then(admin =>{
                    if(!admin){
                        return done(null, false, {message: 'Email is not registered'});
                    }

                    // Match Password
                    bcrypt.compare(password, admin.password, (err, isMatch)=>{
                        if(err) throw err;

                        if(isMatch){
                            return done(null, admin);
                        }else{
                            return done(null, false, {message: 'Incorrect password'});
                        }
                    });
                })
                .catch(error =>{
                    console.log(error);
                });
        })
    );

    passport.serializeUser((admin, done)=>{
        done(null, admin.id);
    });

    passport.deserializeUser((id, done)=>{
        Admin.findById(id, (err, admin)=>{
            done(err, admin);
        });
    });

}