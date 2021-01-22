const model = require("../model/model.js");
let ArticleContorller = {};
let articleData = require("../mockData/article.json")
ArticleContorller.allArticle = async (req,res)=>{
    let {page,limit:pagesize} = req.query;
    let offset = (page - 1) * pagesize;
    let sql = `select * from article limit ${offset},${pagesize}`;
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
module.exports = ArticleContorller;