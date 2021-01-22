const express = require("express");
let router = express.Router();
// 导入相应的控制器
let CateController = require("../controller/CateController");
let ArtController = require("../controller/ArtController");
// 主页面
router.get(/^\/$|^\/index$/,(req,res)=>{
    // res.sendFile(path.join(__dirname,"views/index.html"));
    res.render("index.html");
});

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

// 获取数据库的接口
router.get("/getCate",CateController.getCate);
// 获取数据库cat_id的接口
router.get("/getOneCate",CateController.getOneCate);
// 删除分类的接口
router.post("/delCat", CateController.delCat);
module.exports = router;