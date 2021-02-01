const express = require("express");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const model = require("../model/model.js");
let router = express.Router();
// 导入相应的控制器
let CateController = require("../controller/CateController");
let ArtController = require("../controller/ArtController");
let UserController = require("../controller/UserController");
// 主页面
router.get(/^\/$|^\/index$/,(req,res)=>{
    // let data = {
    //     userInfo:req.session.userInfo
    // }
    res.render("index.html");
});
// 统计出分类的文章总数
router.get("/cateCount", async (req,res)=>{
    let sql = `select count(*) total,t2.name,t1.cat_id from 
               article t1 left join category t2 on t1.cat_id = t2.cat_id group by t1.cat_id`;
    let data = await model(sql);
    res.json(data);
})
// 统计出当前的每月的文章总数
router.get("/artCount", async (req,res)=>{
    let sql = `select month(publish_date) month,count(*) as total from article where
     year(publish_date) = year(now()) group by month(publish_date)`;
     let data = await model(sql);
     res.json(data);
})
// 栏目管理
router.get('/catindex',CateController.catindex);
// 添加分类
router.get("/catadd",CateController.catadd);
// 编辑分类数据
router.get("/catedit",CateController.catedit);
// 编辑分类的接口
router.post("/updCate",CateController.updCate);
// 提交分类数据
router.post("/postCat",CateController.postCat);
// 文章管理
router.get("/artindex",(req,res)=>{
    // res.sendFile(path.join(__dirname,"views/index.html"));
    res.render("article-index.html");
});
// 获取文章数据接口
router.get("/allarticle",ArtController.allArticle);
// 提交文章数据
router.post("/postArt",ArtController.postArt);
// 删除文章
router.post("/delArticle",ArtController.delArticle);
// 添加文章数据
router.get("/addart",ArtController.addArt);
// 渲染出编辑文章的页面
router.get("/artedit",ArtController.artEdit); 
// 上传文件接口
router.post('/upload',upload.single("file"),ArtController.upload)
// 获取单挑文章数据的接口
router.get("/getOneArt",ArtController.getOneArt);
// 编辑文章的数据接口
router.post('/updArt',ArtController.updArt);
// 修改文章状态
router.post('/updStatus',ArtController.updStatus)
// 获取所有分类数据的接口
router.get("/getCate",CateController.getCate);
// 获取数据库cat_id的接口
router.get("/getOneCate",CateController.getOneCate);
// 删除分类的接口
router.post("/delCat", CateController.delCat);
// 渲染登录页面
router.get("/login",(req,res)=>{
    // 如果有用户信息，直接重定向到首页
    if(req.session.userInfo) {
        res.redirect("/");
        return;
    }
    res.render("login.html");
})
// 渲染登录退出页面
router.get("/logout",(req,res)=>{
    // 清空session信息，重定向登录页面
    req.session.destroy(err=>{
        if(err) throw err;
    })
    res.json({message:"退出成功"});
})
// 用户登录
router.post("/signin",UserController.signin);
// 更换用户头像
router.post("/updateAvatar",UserController.updateAvatar);
// 匹配失败的路由
router.all("*",(req,res)=>{
    res.json({errcode:10004,message:"请求错误"});
})
module.exports = router;