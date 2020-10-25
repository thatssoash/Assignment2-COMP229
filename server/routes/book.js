const e = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let bookController = require('../controllers/book');

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

router.get('/', bookController.displayBookList);

//Get Route For Add Page - Create Application

router.get('/add', requireAuth, bookController.displayAddPage);

//Post Route for processing
router.post('/add', requireAuth, bookController.displayProcessAddPage);

// Get Route for Edit Page - Update Operations

router.get('/edit/:id', requireAuth, bookController.displayEditPage);


//Post Route for processing - Update

router.post('/edit/:id', requireAuth, bookController.displayProcessEditPage);

//Get route for performing deletion

router.get('/delete/:id', requireAuth,bookController.ProcessDelete);

module.exports = router;