// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/add', {title: 'Add a Book'}) // code added
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  // create an oject of the book model class
  let newbook = book({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre       
});

book.create(newbook, (err, book) =>{
  if(err)
  {
      console.log(err);
      res.end(err);
  }
  else
  {
      res.redirect('/books');
  }
});

});

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {

  let id = req.params.id;

  book.findById(id, (err, booksToUpdate) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          res.render('books/details', {title: 'Edit Book', books: booksToUpdate})
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

  let id = req.params.id

  let updatedBooks = book({
      "_id": id,
      "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre     

});

book.updateOne({_id: id}, updatedBooks, (err) => {
  if(err)
  {
      console.log(err);
      res.end(err);
  }
  else
  {
      // Redirect the user back to the BookList page after update
      res.redirect('/books');
  }
});

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  //pass id to the remove method
  book.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
           // redirect the user back to the BookList page
           res.redirect('/books');
      }
  });
});

module.exports = router;
