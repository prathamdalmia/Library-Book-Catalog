const express = require("express")
const router = express.Router()
const libControllers = require('../controllers/libControllers')


//import validate Token middleware 
const {validateToken,describeToken} = require('../controllers/middleware/validateToken')


//import all to-do controllers 
const addBook = libControllers.addBook
const getBook = libControllers.getBook
const getBookById = libControllers.getBookById
const updateBook = libControllers.updateBook
const deleteBook = libControllers.deleteBook
const searchBook = libControllers.searchBook
const toggleAvailability = libControllers.toggleAvailability

router.post('/addbook',validateToken,addBook);
router.post('/getbook',validateToken,getBook);
router.post('/getbookbyid',validateToken,getBookById);
router.put('/update',validateToken,updateBook);
router.delete('/delete',validateToken,deleteBook);
router.post('/search',validateToken,searchBook);
router.post('/toggle' ,validateToken,toggleAvailability )

module.exports = router; 