let express = require("express");
let router = express.Router();
router.get("/article",(req,res)=>{
    res.json({data:"文章"})
})
router.get("/cate",(req,res)=>{
    res.json({data:"列表"})
})
module.exports = router;