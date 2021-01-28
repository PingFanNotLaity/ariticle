const model = require("../model/model.js");
const fs = require("fs");
let ArticleContorller = {};
let articleData = require("../mockData/article.json")
// 获取分页文章数据
ArticleContorller.allArticle = async (req,res)=>{
    let {page,limit:pagesize} = req.query;
    let offset = (page - 1) * pagesize;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id=t2.cat_id order by art_id desc limit ${offset},${pagesize}`;
    let sql2 = `select count(*) as count from article`;
    let promise1 = model(sql);
    let promise2 = model(sql2);
    let result = await Promise.all([promise1,promise2]); 
    let data = result[0];
    let count = result[1][0].count;
    let response = {
        code:0,
        count:count,
        data:data,
        msg:""
    }
    res.json(response);
}
const responseMessage = require("../util/responseMessage.js");

// 删除文章
ArticleContorller.delArticle = async (req,res)=> {
    let {art_id} = req.body;
    console.log(art_id);
    let sql = `delete from article where art_id = ${art_id}`;
    let result = await model(sql);
    if(result.affectedRows) {
        console.log(result.affectedRows);
        res.json(responseMessage.delsucc)
    }else{
        res.json(responseMessage.delfail)
    }
}
// 添加文章
ArticleContorller.addArt = (req,res)=>{
    res.render('article-add.html')
}
// 提交数据入库
ArticleContorller.postArt = async (req,res)=>{
    let {title,cat_id,status,content,cover} = req.body;
    let sql = `insert into article(title,content,cat_id,status,cover,publish_date)
    values('${title}','${content}',${cat_id},${status},'${cover}',now())`;
    let result = await model(sql);
    if(result.affectedRows) {
        res.json(responseMessage.addsucc);
    }else{
        res.json(responseMessage.addfail);
    }
}
// 编辑文章
ArticleContorller.artEdit = (req,res)=>{
    res.render('article-edit.html')
}
// 上传图片的接口
ArticleContorller.upload = (req,res)=>{
    if(req.file){
        // 进行文件的重命名即可 fs.rename
        let {originalname,destination,filename} = req.file;
        let dotIndex = originalname.lastIndexOf('.');
        let ext = originalname.substring(dotIndex);
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${filename}${ext}`;
        fs.rename(oldPath,newPath,err=>{
            if(err){ throw err; }
            res.json({code:0,message:'上传文件成功',src:newPath})
        })
    }else{
        res.json({code:1,message:'上传文件失败',src:""})
    }
    
    
}
// 获取单条文章
ArticleContorller.getOneArt = async(req,res)=>{
    let {art_id} = req.query;
    let sql = `select * from article where art_id = ${art_id}`;
    let data = await model(sql);
    res.json(data[0] || {});
}
// 修改文章状态
ArticleContorller.updStatus = async (req,res)=>{
    let {art_id,status} = req.body;
    let sql = `update article set status = ${status} where art_id = ${art_id}`;
    let result = await model(sql);
    if(result.affectedRows) {
        res.json(responseMessage.updsucc);
    }else{
        res.json(responseMessage.updfail);
    }
}
module.exports = ArticleContorller;