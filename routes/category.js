let express=require('express');
let {Category}=require('../model');
let router=express.Router();
router.get('/list',function (req,res) {
    //查询出所有的分类列表
    Category.find({},function (err,doc) {
        //渲染文章分类列表
        res.render('category/list',{doc,title:'文章分类管理'});
    });
});
router.get('/add',function (req,res) {
    res.send('得到添加分类的列表')
});
router.post('/add',function (req,res) {
    res.send('提交增加分类的列表')
})
module.exports=router;