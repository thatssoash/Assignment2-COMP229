let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

//create reference to DB
let Contact = require('../models/contact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err)
        {
            return console.error(err);
        }
        else {
    
            res.render('contact/list', {title: 'Contacts', ContactList: contactList, displayName: req.user ? req.user.displayName : ''});
        }
    
    });
}

module.exports.displayAddPage = (req, res, next) =>{
    res.render('contact/add', {title: 'Add Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProcessAddPage = (req, res, next) =>{
    let newContact = Contact({
 "name": req.body.name,
 "number": req.body.number,
 "email": req.body.email
    });

    Contact.create(newContact, (err, Contact)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            //refresh the booklist

            res.redirect('/contact-list');
        }
        
    });
}

module.exports.displayEditPage = (req, res, next) =>{

    let id = req.params.id;
    
    Contact.findById(id, (err, contactToEdit) => {
    if(err){
        console.log(err)
        res.end(err);
    }
    else{
        res.render('contact/edit', {title: 'Edit Contact', contact: contactToEdit, displayName: req.user ? req.user.displayName : ''})
    }
    });
}

module.exports.displayProcessEditPage = (req, res, next) =>{

    let id = req.params.id;
    
    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });
    
    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contact-list');
        }
    });
}

module.exports.ProcessDelete = (req, res, next) =>{
    let id = req.params.id;
    
    Contact.remove({_id: id}, (err) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
        res.redirect('/contact-list');
    }
    });
}






