let express=require('express');
let {Category}=require('../model');
let router=express.Router();
router.get('/list',function (req,res) {
    //查询出所有的分类列表
    //查询时候只能查出创建者是当前登录的ID的分类
    Category.find({user:req.session.user._id},function (err,doc) {
        //渲染分类列表
        res.render('category/list',{doc,title:'分类管理'});
    });
});
router.get('/add',function (req,res) {
    res.render('./category/add',{title:'添加分类'});
});
router.post('/add',function (req,res) {
    let category=req.body;
    //把会话对象中的user属性的主键赋给分类的user属性
    category.user=req.session.user._id;
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