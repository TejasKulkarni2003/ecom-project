const express = require("express");
const app = express();
const product = require("./routes/productRoute")
const errorMiddleware = require("./middleWare/error")
const user = require("./routes/userRoute")
const cookieParser = require("cookie-parser")
const order = require("./routes/orderRoute")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload());
//Routes

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)

//middlewares
app.use(errorMiddleware)


module.exports = app