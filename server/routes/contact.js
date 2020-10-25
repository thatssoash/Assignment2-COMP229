const e = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let contactController = require('../controllers/contact');

//helper function for Guard

function requireAuth(req,res, next)
{
    //to check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}

/* Get Route for our Book List Page */

router.get('/', contactController.displayContactList);

//Get Route For Add Page - Create Application

router.get('/add', requireAuth, contactController.displayAddPage);

//Post Route for processing
router.post('/add', requireAuth, contactController.displayProcessAddPage);

// Get Route for Edit Page - Update Operations

router.get('/edit/:id', requireAuth, contactController.displayEditPage);


//Post Route for processing - Update

router.post('/edit/:id', requireAuth, contactController.displayProcessEditPage);

//Get route for performing deletion

router.get('/delete/:id', requireAuth,contactController.ProcessDelete);

module.exports = router;