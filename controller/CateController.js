const model = require("../model/model.js");
const responseMessage = require("../util/responseMessage.js");
const { render } = require("art-template");
let CateController = {};
// 控制后台分类的页面
CateController.catindex = (req,res)=>{
    // res.sendFile(path.join(__dirname,"views/index.html"));
    res.render("category-index.html");
};
// 获取分类数据的接口
CateController.getCate = async (req,res)=>{
    let sql = "select * from category order by sort desc";
    let data = await model(sql)
    res.json(data); 
};
// 获取cat_id分类数据的接口
CateController.getOneCate = async (req,res)=>{
    let {cat_id} = req.query;
    if(!cat_id) {
        res.json(argsfail);
    }else{
        let sql = `select * from category where cat_id=${cat_id}`;
        let data = await model(sql);
        if(data.length) {
            data[0].errcode = 0;
            res.json(data[0]);
        }else{
            res.json(responseMessage.getfail);
        }
    }
};
// 实现分类编辑的入库
CateController.updCate = async (req,res)=>{
    let {cat_id,name,sort,add_date} = req.body;
    let sql = `update category set name="${name}",sort=${sort},add_date="${add_date}" where cat_id=${cat_id}`;
    let result = await model(sql);
    if(result.affectedRows) {
        res.json(responseMessage.updsucc);
    }else{
        res.json(responseMessage.updfail);
    }
}
// 删除分类
CateController.delCat = async (req,res)=>{
    let {cat_id} = req.body;
    if(!cat_id) {
        res.json(responseMessage.argsfail);
    }else{
        cat_id = parseInt(cat_id);
        let sql = `delete from category where cat_id = ${cat_id}`;
        let result;
        let response;
        result = await model(sql);
        console.log(result);
        if(result.affectedRows) {
            res.json(responseMessage.delsucc)
        }else{
            res.json(responseMessage.delfail);
        }
        res.json(response);
    }
};
// 添加分类
CateController.catadd = (req,res)=>{
    res.render("category-add.html");
};
// 编辑分类数据
CateController.catedit = (req,res)=>{
    res.render("category-edit.html");
};
// 添加分类接口
CateController.postCat = async (req,res)=>{
    let {name,sort,add_date} = req.body;
    let sql = `insert into category(name,sort,add_date) values('${name}',${sort},'${add_date}')`;
    let result = await model(sql);
    if(result.affectedRows) {
        // 成功
        res.json(responseMessage.addsucc);
    }else{
        res.json(responseMessage.addfail);
    };
}
module.exports = CateController;