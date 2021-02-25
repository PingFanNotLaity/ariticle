let express = require("express");
let router = express.Router();  
let model = require("../model/model.js");
// 获取所有的分类
router.get("/cate",async (req,res)=>{
    let sql = `select * from category`;
    let data = await model(sql);
    res.json(data);
});
// 获取最新的文章
router.get("/article",async (req,res)=>{
    let {_page=1,_limit=5} = req.query;
    let offset = (_page - 1) * _limit;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id=t2.cat_id 
    where status = 1 order by publish_date desc limit ${offset},${_limit}`;
    let data = await model(sql);
    data.map(v=>{
        if(v.cover) {
            v.cover = `http://localhost:4000/${v.cover}`;
        };
    });
    res.json(data);
});
// 获取文章详情页
router.get("/article/:art_id",async (req,res)=>{
    let {art_id} = req.params;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id=t2.cat_id where art_id = ${art_id}`;
    let data = await model(sql);
    res.json(data[0] || {});
})
// 获取某个分类下面的文章
router.get("/getCateArticle/:cat_id",async (req,res)=>{
    let {cat_id=0} = req.params;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id=t2.cat_id where t1.cat_id=${cat_id} and status = 1 order by publish_date desc`;
    let data = await model(sql);
    data.map(v=>{
        if(v.cover) {
            v.cover = "http://localhost:4000/" + v.cover;
        }
    })
    res.json(data);
})
module.exports = router;