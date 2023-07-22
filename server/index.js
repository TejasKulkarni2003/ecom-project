const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./configurations/database")
//uncaught Errors
process.on("uncaughtException", (err)=>{
    console.log(`Error : ${err}`);
    console.log("Closing Server by uncaughtException");
    process.exit(1);
})
//configuration
dotenv.config({path:"server/configurations/config.env"})

//db connection
connectDB()


const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server Start at ${process.env.PORT}`);
})


//unhandled rejection by server
process.on("unhandledRejection", (err)=>{
    console.log(`Error : ${err}`);
    console.log("Closing Server");

    server.close(()=>{
        process.exit(1);
    })
})