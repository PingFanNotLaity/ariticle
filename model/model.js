// 封装mysql语句的promise函数
const mysql = require("mysql");
//导入数据库参数的配置
let bdConfig = require("../congin/bd.json");
var connection = mysql.createConnection({
    ...bdConfig
});
connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('connect mysql success');
});

function bdquery(sql) {
    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,data)=>{
            if(err) {reject(err)};
            resolve(data);
        })
    })
}
module.exports = bdquery;