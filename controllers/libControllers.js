const Book = require('../model/book')
const asynchandler = require('express-async-handler')

const addBook = asynchandler(async (req, res)=>{
    try{
        const book = new Book(req.body)
        await book.save()
        res.status(201).json(book)

    }catch(error){
        res.status(400).json({error : error.message})
    }
})



const getBook = asynchandler(async (req , res) => {
    try{
        const book = await Book.find({username : req.body.username})
        return res.status(200).json(book)
    }catch(error){
        res.status(500).json({error : error.message})
    }
})

const getBookById = asynchandler(async (req , res) => {
    try {
        const bookById = await Book.findById(req.body.id)
        if(!bookById) {
            res.status(404).json({error : 'Book Not Found '})
            return
        }
        res.status(201).json(bookById)
        
    } catch (error) {
        res.status(500).json({error : error.message})
        return 
    }
})




const updateBook = asynchandler(async (req ,res) => {
    try {
        const bookUpdate = await Book.findByIdAndUpdate(req.body.id , req.body,{new : true , runValidators : true, })
        if (!bookUpdate) {
            res.status(404).json({error : 'Book Not Found '})
            return
        }
        res.status(201).json(bookUpdate)

    } catch (error) {
        res.status(500).json({error : error.message})
    }
})



const deleteBook = asynchandler(async (req , res) => {
    try {
        const bookDelete = await Book.findByIdAndDelete(req.body.id)
        if(!bookDelete){
            res.status(404).json({error : 'Book Not Found '})
            return
        }
        res.status(201).json(bookDelete)
        
    } catch (error) {
        res.status(500).json({error : error.message})
        
    }
})





const searchBook = asynchandler(async (req ,res) =>{
    try {
        const key = req.query.key
        if(!key){
            res.status(400).json({error : 'Provide Proper Key'})
            return
        }
        const regexTask = new RegExp(key , 'i') 
        const results = await Book.find({
            $or : [
                {title : regexTask},
                {author : regexTask}
            ],
            username : req.body.username
        })
        res.status(200).json(results)

    } catch (error) {
        res.status(500).json({error : error.message})
    }
})


const toggleAvailability = asynchandler(async (req ,res) => {
    try{
        const id = req.body.id
        if (!id) {
            return res.status(400).json({ error: 'Select a Book' })
        }
        const book = await Book.findById(id)
        if(!book){
            res.status(404).json({error : 'Something Went Wrong'})
            return
        }
        book.availability = !book.availability
        await book.save()
        res.status(200).json({message : 'Change Successful'})

    }catch(err){
        res.status(500).json({error : err.message})
    }

})


module.exports = {
    addBook,
    getBook,
    getBookById,
    updateBook,
    deleteBook,
    searchBook,
    toggleAvailability
}