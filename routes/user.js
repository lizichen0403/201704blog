let express=require('express');
//生成一个路由中间件的实例
let router=express.Router();
let {User}=require('../model');
router.get('/signup',function (req,res) {
    //参数1是相对于模版的根目录的相对路径
    res.render('./user/signup',{title:'用户注册'});
});
router.post('/signup',function (req,res) {
    //先得到bodyPaser中间件解析得到的user对象
    let user=req.body;
    //在数据库中查找有没有根自己用户名相同的用户
    User.findOne({username:user.username},function (err,olduser) {
        if(err){
            res.redirect('back');
        }else {
            if(olduser){
                res.redirect('back');
            }else {
                User.create(user,function (err,doc) {
                    if(err){
                        res.redirect('back');
                    }else {
                        res.redirect('/user/signin');
                    }
                });
            }
        }
    });
});
router.get('/signin',function (req,res) {
    res.send('登录');
});
router.post('/signup',function (req,res) {
    res.send('提交登录');
});
router.get('/signout',function (req,res) {
    res.send('退出');
});
module.exports=router;