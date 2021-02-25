let express = require("express");
let app = express();
let apiRouter = require("./apiRouter.js");
app.use("/api",apiRouter);
app.listen(5000,()=>{
    console.log("server is open prot number is 5000");
})