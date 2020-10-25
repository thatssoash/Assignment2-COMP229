const e = require("express");
let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create User Model
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) =>{
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});

}

module.exports.displayAboutPage = (req, res, next) =>{
    res.render('about', { title: 'About Me', displayName: req.user ? req.user.displayName : ''});

}

module.exports.displayProjectsPage = (req, res, next) =>{
    res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName : ''});

}

module.exports.displayServicesPage = (req, res, next) =>{
    res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName : ''});

}

module.exports.displayContactPage = (req, res, next) =>{
    res.render('contact', { title: 'Contact', message: 'Contact Me!', displayName: req.user ? req.user.displayName : ''});

}


module.exports.displayLoginPage = (req, res, next) =>{
    //check if user logged in

    if(!req.user)
    {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else{
        return res.redirect('/');
    }
    
}

module.exports.ProcessingLoginPage = (req, res, next) =>{
    passport.authenticate('local',
    (err, user, info)=> {
        //server err
        if(err){
            return next(err);
        }
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.direct('/login');
        }

        req.login(user, (err) => {
            //server error
            if(err){
                return next(err);
            }
            return res.redirect('/book-list');
        });
    }) (req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>{
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else{
        return res.redirect('/');
    }

}

module.exports.ProcessingRegisterPage = (req, res, next) =>{
    //User Object
    let newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err)=>{
        if(err)
        {
            console.log("Error Inserting New User");
            if(err.name == "userExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );

                console.log('Error: User Already Exists')
            }
            return res.render('auth/register', {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''

            });
        }
        else {
            //no error, registration success
            //redirect user and authenticate

            return passport.authenticate('local')(req,res, () => {
                res.redirect('/book-list')
            });


        }
    });

}

module.exports.ProcessingLogOut = (req, res, next) =>{
    req.logout();
    res.redirect('/');

}
