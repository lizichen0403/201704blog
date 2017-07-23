let express=require('express');
//生成一个路由中间件的实例
let router=express.Router();
//解析上传文件的中间件
let multer=require('multer');
//调用multer方法传入配置参数,在参数中指定上传后文件的保存位置
let upload=multer({dest:'./public'});
//引入数据库
let {User}=require('../model');
router.get('/signup',function (req,res) {
    //参数1是相对于模版的根目录的相对路径
    res.render('./user/signup',{title:'注册'});
});
//upload.single会得到一个中间件函数,此中间件函数会在路由匹配之后执行
//single是此表单里只有一个文件字段,字段的名称叫avatar
//引入此中间件之后,req.file指向上传后的文件对象,req.body存放着所有的其他的文本类型的字段
router.post('/signup',upload.single('avatar'),function (req,res) {
    //先得到bodyPaser中间件解析得到的user对象
    let user=req.body;
    user.avatar=`/${req.file.filename}`;
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
                //如果登录成功之后会把查询到的用户对象赋给会话对象的user属性
                req.session.user=olduser;
                res.redirect('/');
            }else {
                req.flash('error','对不起,用户名或密码错误,请重新输入');
                res.redirect('back');
            }
        }
    });
});
router.get('/signout',function (req,res) {
    //把session的user属性设置为null,就变成了未登录状态
    req.session.user=null;
    //所有的url路径都必须是/开头
    //所有的模版路劲都不用/开头
    res.redirect('/user/signin');
});
module.exports=router;