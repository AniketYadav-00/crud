const express = require("express")
const {handleBookStoreController, handleBookListController,handleBookDeleteController} = require("../controller/book.controller")

const router = express.Router()

router.post("/addbook",handleBookStoreController)

router.get("/booklist",handleBookListController)

router.post("/deletebook",handleBookDeleteController)

module.exports = router
