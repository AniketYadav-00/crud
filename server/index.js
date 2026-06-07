const express = require("express")
const app = express()
const bookRouter = require("./routes/book.routes")
const databaseConnection = require("./database")
const cors = require("cors")

app.use(cors())

app.use(express.json())

app.use("/book",bookRouter)

app.get("/", (req,res)=>{
    res.send("Hello")

})

databaseConnection()

app.listen(8080, () => {
    console.log("App is listening")
})



