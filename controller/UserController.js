const model = require("../model/model.js");
const md5 = require("md5");
let {secret:passSecret} = require("../congin/app.json");
// 用户控制器
let UserController = {};
// 登录方式signin
UserController.signin = async (req,res)=>{
    let {username,password} = req.body;
    // 数据库查询要把密码加密md5之后再判断
    password = md5(`${password}${passSecret}`)
    let sql = `select * from users where username="${username}" and password="${password}"`;
    let data = await model(sql)
    if(data.length) {
        // 匹配成功
        // 把用户信息存到session中
        let userInfo = data[0];
        req.session.userInfo = userInfo;
        res.json({errcode:0,message:"登录成功"});
    }else{
        res.json({errcode:10008,message:"用户名或密码错误"});
    }
}
module.exports = UserController;