const express = require("express");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
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
// 提交文章数据
router.post("/postArt",ArtController.postArt);
// 删除文章
router.post("/delArticle",ArtController.delArticle);
// 添加文章数据
router.get("/addart",ArtController.addArt);
// 编辑文章数据
router.get("/artedit",ArtController.artEdit);
// 上传文件接口
router.post('/upload',upload.single("file"),ArtController.upload)
// 获取单挑文章数据的接口
router.get("/getOneArt",ArtController.getOneArt);
// 修改文章状态
router.post('/updStatus',ArtController.updStatus)
// 获取所有分类数据的接口
router.get("/getCate",CateController.getCate);
// 获取数据库cat_id的接口
router.get("/getOneCate",CateController.getOneCate);
// 删除分类的接口
router.post("/delCat", CateController.delCat);
module.exports = router;