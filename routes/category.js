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
    res.render('./category/add',{title:'添加分类'});
});
router.post('/add',function (req,res) {
    let category=req.body;
    //把分类对象保存到数据库中
    Category.create(category,function (err,doc) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back');
        }
        else {
            req.flash('success','添加分类成功');
            res.redirect('/category/list');
        }
    })

});
router.get('/delete/:_id',function (req,res) {
    let _id=req.params._id;
    Category.remove({_id},function (err,doc) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back');
        }else {
            req.flash('success','删除成功');
            res.redirect('/category/list');
        }
    })
});
module.exports=router;