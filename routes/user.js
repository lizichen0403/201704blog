let express=require('express');
//生成一个路由中间件的实例
let router=express.Router();
let {User}=require('../model');
router.get('/signup',function (req,res) {
    //参数1是相对于模版的根目录的相对路径
    res.render('./user/signup',{title:'注册'});
});
router.post('/signup',function (req,res) {
    //先得到bodyPaser中间件解析得到的user对象
    let user=req.body;
    //在数据库中查找有没有根自己用户名相同的用户
    User.findOne({username:user.username},function (err,olduser) {
        if(err){
            //写入一个错误的消息
            req.flash('error',err.toString());
            res.redirect('back');
        }else {
            if(olduser){
                req.flash('error','用户名已经存在');
                res.redirect('back');
            }else {
                User.create(user,function (err,doc) {
                    if(err){
                        req.flash('error',err.toString());
                        res.redirect('back');
                    }else {
                        req.flash('success','恭喜你,注册成功');
                        res.redirect('/user/signin');
                    }
                });
            }
        }
    });
});
router.get('/signin',function (req,res) {
    res.render('./user/signin',{title:'登录'});
});
router.post('/signin',function (req,res) {
    let user=req.body;
    User.findOne(user,function (err,olduser) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back');
        }else {
            if(olduser){
                req.flash('success','恭喜你,登录成功');
                res.redirect('/');
            }else {
                req.flash('error','对不起,用户名或密码错误,请重新输入');
                res.redirect('back');
            }
        }
    });
});
router.get('/signout',function (req,res) {
    res.send('退出');
});
module.exports=router;