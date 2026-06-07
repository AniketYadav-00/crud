const {Book} = require("../model/book.model")

const handleBookStoreController = async (req,res) => {
try {
        const body = req.body

        if(!body.BookName || !body.BookTitle || !body.Author || !body.SellingPrice)
        {
            return res.status(400).json({Message : "All fields are required", success : false})
        }
        const bookAdd = await Book.insertOne(body)
        if(bookAdd) {

            return res.status(201).json({Message : "Data created succefully", success : true})
        }
        console.log("BookAdd " ,bookAdd)
    } catch(err) {
        return res.status(500).json({Message : err.message, Success : false})
    }
} 
const handleBookListController = async (req,res) => {
    try{
        const bookList = await Book.find({})
        return res.status(200).json({Message : "All books fetched successfully", Success : true, TotalCount : bookList.length, BookList : bookList})
    }catch(error){
        return res.status(400).json({Message : err.message, Success : false})
    }
}

const handleBookDeleteController = async (req,res) => {

    const body = req.body
    try{
        const deleted = await Book.deleteOne({_id:body.Id})
        if(deleted.acknowledged)
        {
            return res.status(200).json({Message : "Book deleted successfully", Success : true})
        }
    }catch(error){
        return res.status(400).json({Message : err.message, Success : false})
    }
}
module.exports = {handleBookStoreController,handleBookListController,handleBookDeleteController}