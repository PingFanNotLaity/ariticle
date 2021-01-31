const express = require("express");
const path = require("path");
const artTemplate = require('art-template'); 
const express_template = require('express-art-template');
// 引入session会话技术
let session = require('express-session');
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

// 初始化session,定义session一些配置
let options = {
    name:"SESSIONID", // 待会写入到cookie中标识
    secret: "FGVH$#E%&", // 用来加密会话，防止篡改。
    cookie: {
        httpOnly: true,
        secure: false, // false-http(默认), true-https
        maxAge:60000*24, // session在cookies存活24分钟，
        // 再次访问，时间重置为24分钟， 24分钟内只要不访问则会失效
    }
};
app.use( session(options) )
app.use("/public",express.static(path.join(__dirname,"public")));
// 上传图片路径的中间件
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
// 在进入路由匹配函数之前，要进行验证的权限
app.use(function(req,res,next){
    let path = req.path.toLowerCase();
    let noCheckAuth = ["/login","/signin","/logout"];
    if(noCheckAuth.includes(path)) {
        // 需要放行，不做任何操作
        next();
    }else{
        // 不放行，需要验证权限
        if(req.session.userInfo) {
            next();
        }else{
             // res.redirect("/login");
             next()
        }
    }
});
app.use(router);
app.listen(4000,()=>{
    console.log("server is open, port number is 4000");
})