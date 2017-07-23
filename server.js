//1.引入express模块
let express=require('express');
//首页路由
let index=require('./routes/index');
//用户路由
let user=require('./routes/user');
//文章路由
let article=require('./routes/article');
//引入session中间件
let session=require('express-session');
//使用mongodb存储会话的中间件,返回一个函数需要执行并传入session作为参数
let Mongodb =require('connect-mongo')(session);
//引入消息提示的中间件
let flash=require('connect-flash');
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
//创建静态文件中间件
app.use(express.static(path.resolve('node_modules')));
//把public目录做为静态文件中间件
app.use(express.static(path.resolve('public')));
//使用此中间件之后,会在req.session属性
app.use(session({
    resave:true,//每次重新保存session
    saveUninitialized:true,//保存未初始化的session
    secret:'zfpx',//加密cookie的密钥
    store:new Mongodb({//会话存储的位置
        url:'mongodb://127.0.0.1/201704blog'
    })
}));
//使用此flash中间件,会在请求对象上多一个flash属性,flash是一个方法,传两个参数表示存储消息,传一个参数表示读取消息,读完后立刻销毁
app.use(flash())
//设置模版对象默认值
app.use(function (req,res,next) {
    res.locals.title='珠峰博客';
    //在中间件中把成功消息从flash取出,赋给模版使用
    res.locals.success=req.flash('success').toString();
    //在中间件中把失败消息从flash取出,赋给模版使用
    res.locals.error=req.flash('error').toString();
    //一旦读取,此消息立即销毁
    //每次服务器接收到请求后,把会话对象中的user属性取出来赋给模版的数据对象
    res.locals.user=req.session.user;
    next();
});

//如果客户端访问的路径是/开头,会走index路由中间件
app.use('/',index);
//如果客户端访问的路径是/user开头,会走user路由中间件
app.use('/user',user);
//如果客户端访问的路径是/category开头,会走category路由中间件
app.use('/category',category);
//如果客户端访问的路径是/article开头,会走article路由中间件
app.use('/article',article);
//3.监听端口
app.listen(9090);