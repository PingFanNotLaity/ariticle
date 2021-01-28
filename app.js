const express = require("express");
const path = require("path");
const artTemplate = require('art-template'); 
const express_template = require('express-art-template');
// 导入router路由模块
const router = require("./router/router.js");
let app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template); 
//使用模板引擎扩展名为html
// 首页
app.set('view engine', 'html');
app.use("/public",express.static(path.join(__dirname,"public")));
// 上传图片路径的中间件
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(router);
app.listen(4000,()=>{
    console.log("server is open, port number is 4000");
})