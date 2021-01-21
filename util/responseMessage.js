const responseMessage = {
    argsfail:{errcode:10001,"message":"参数有误"},
    delsucc:{errcode:0,"message":"删除成功"},
    delfail:{errcode:10002,"message":"服务器繁忙"},
    addsucc:{errcode:0,message:"添加成功"},
    addfail:{errcode:10003,message:"添加失败"},
    getsucc:{errcode:0,message:"获取成功"},
    getfail:{errcode:10004,message:"获取失败"},
    updsucc:{errcode:0,message:"编辑成功"},
    updfail:{errcode:10005,message:"编辑失败"}
}
module.exports = responseMessage;