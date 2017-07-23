let express=require('express');
let {Article,Category}=require('../model');
let router=express.Router();
//添加文章  修改文章  删除文章  查看文章列表
router.get('/add',function (req,res) {
    Category.find({user:req.session.user._id},function (err,categories) {
        res.render('./article/add',{categories,article:{},title:'发表文章'});
    })
});
router.post('/add',function (req,res) {
    let article=req.body;
    //把会话对象中的user属性的主键赋给分类的user属性
    article.user=req.session.user._id;
    console.log(req.session.user._id);
    //把分类对象保存到数据库中
    Article.create(article,function (err,doc) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back');
        }
        else {
            req.flash('success','添加文章成功');
            res.redirect('/');
        }
    })
});
router.get('/detail/:_id',function (req,res) {
    let _id=req.params._id;
    Article.findById(_id).populate('category').populate('user').exec((err,article)=>{
        console.log(article);
        res.render('article/detail',{article,title:'文章详情'});
    });
});
router.get('/delete/:_id',function (req,res) {
    let _id=req.params._id;
    Article.remove({_id},function (err,doc) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back');
        }else {
            req.flash('success','删除成功');
            res.redirect('/');
        }
    })
});
router.get('/update/:_id',function (req,res) {
    let _id=req.params._id;
    Category.find({user:req.session.user._id},function (err,categories) {
        Article.findById(_id).exec(function (err,article) {
            res.render('article/add',{article,categories,title:'修改文章'});
        });
    });
});
router.post('/update/:_id',function(req,res){
    let _id = req.params._id;
    let article = req.body;
    Article.update({_id},article,function(err,result){
        if(err){
            req.flash('error',err.toString);
            res.redirect('back');
        }else{
            res.redirect(`/article/detail/${_id}`);
        }
    });
});
module.exports=router;