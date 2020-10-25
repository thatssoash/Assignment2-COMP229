let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

//create reference to DB
let Book = require('../models/book');

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if (err)
        {
            return console.error(err);
        }
        else {
    
            //console.log(bookList)
    
            res.render('book/list', {title: 'Books', BookList: bookList, displayName: req.user ? req.user.displayName : ''});
        }
    
    });
}

module.exports.displayAddPage = (req, res, next) =>{
    res.render('book/add', {title: 'Add Book', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProcessAddPage = (req, res, next) =>{
    let newBook = Book({
 "name": req.body.name,
 "author": req.body.author,
 "yearPublished": req.body.yearPublished,
 "Description": req.body.Description,
 "Price": req.body.Price

    });

    Book.create(newBook, (err, Book)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            //refresh the booklist

            res.redirect('/book-list');
        }
        
    });
}

module.exports.displayEditPage = (req, res, next) =>{

    let id = req.params.id;
    
    Book.findById(id, (err, bookToEdit) => {
    if(err){
        console.log(err)
        res.end(err);
    }
    else{
        res.render('book/edit', {title: 'Edit Book', book: bookToEdit, displayName: req.user ? req.user.displayName : ''})
    }
    });
}

module.exports.displayProcessEditPage = (req, res, next) =>{

    let id = req.params.id;
    
    let updatedBook = Book({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "yearPublished": req.body.yearPublished,
        "Description": req.body.Description,
        "Price": req.body.Price
    });
    
    Book.updateOne({_id: id}, updatedBook, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/book-list');
        }
    });
}

module.exports.ProcessDelete = (req, res, next) =>{
    let id = req.params.id;
    
    Book.remove({_id: id}, (err) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
        res.redirect('/book-list');
    }
    });
}






