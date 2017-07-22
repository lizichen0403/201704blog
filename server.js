//1.引入express模块
let express=require('express');
//首页路由
let index=require('./routes/index');
//用户路由
let user=require('./routes/user');
//文章分类路由
let category=require('./routes/category');
let bodyParser=require('body-parser');
let path=require('path');
//2.执行express方法得到app
let app=express();
//把urlencoded格式的字符串转成json对象
app.use(bodyParser.urlencoded({extend:true}));
//1.设置模版引擎
app.set('view engine','html');
//2.设置模版的存放目录
app.set('views',path.resolve('views'));
//3.设置html类型的模版
app.engine('.html',require('ejs').__express);
//设置模版对象默认值
app.use(function (req,res,next) {
    res.locals.title='珠峰博客';
    next();
})
//创建静态文件中间件
app.use(express.static(path.resolve('node_modules')));
//如果客户端访问的路径是/开头,会走index路由中间件
app.use('/',index);
//如果客户端访问的路径是/user开头,会走user路由中间件
app.use('/user',user);
//如果客户端访问的路径是/category开头,会走category路由中间件
app.use('/category',category);
//3.监听端口
app.listen(9090);