const model = require("../model/model.js");
const fs = require("fs");
let ArticleContorller = {};
let articleData = require("../mockData/article.json")
// 获取分页文章数据
ArticleContorller.allArticle = async (req,res)=>{
    let {page,limit:pagesize,title,status} = req.query;
    // 定义查询条件
    let where = 'where 1';
    // 有值（为真）才拼接查询条件
    title && (where += ` and t1.title like '%${title}%'`)
    status && (where += ` and t1.status='${status}'`)
    let offset = (page - 1) * pagesize;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id = t2.cat_id
                ${where}
                order by t1.art_id desc limit ${offset},${pagesize} `;
    let sql2 = `select count(*) as count from article t1 ${where}`
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
    res.render('article-add.html');
}
// 提交数据入库
ArticleContorller.postArt = async (req,res)=>{
    let {title,cat_id,status,content,cover} = req.body;
    let username = req.session.userInfo.username;
    let sql = `insert into article(title,content,author,cat_id,status,cover,publish_date)
    values('${title}','${content}','${username}',${cat_id},${status},'${cover}',now())`;
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
// 编辑文章数据的入库
ArticleContorller.updArt = async (req,res)=>{
    // 接收post数据
    let {cover,title,cat_id,art_id,content,status,oldCover} = req.body;
    let sql;
    if(cover) {
        // 有值更新图片且删除原图
        sql = `update article set title="${title}",content="${content}",cover="${cover}",
               cat_id=${cat_id},status="${status}" where art_id=${art_id}`;
    }else{
        // 没有值就保留原图片
        sql = `update article set title="${title}",content="${content}",
        cat_id=${cat_id},status="${status}" where art_id=${art_id}`;
    }
        
    let result = await model(sql);
    if(result.affectedRows) {
        // 成功之后删除原图
        cover && fs.unlinkSync(oldCover);
        res.json(responseMessage.updsucc);
    }else{
        res.json(responseMessage.updfail);
    }

}
module.exports = ArticleContorller;