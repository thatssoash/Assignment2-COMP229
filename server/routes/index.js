/*  File Name: Assignment 2
    Name: Asheka Hall
    Student Id: 301064568 
    Date: October 25, 2020 */

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us Page */
router.get('/contact', indexController.displayContactPage);



/* GET Log In Page */
router.get('/login', indexController.displayLoginPage);

/* Post Processing Log In Page */
router.post('/login', indexController.ProcessingLoginPage);

/* GET Register Page */
router.get('/register', indexController.displayRegisterPage);

/* Post Processing Register Page */
router.post('/register', indexController.ProcessingRegisterPage);

/* GET Processing Log OutPage */
router.get('/logout', indexController.ProcessingLogOut);

module.exports = router;
