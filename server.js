//1.引入express模块
let express=require('express');
//首页路由
let index=require('./routes/index');
//用户路由
let user=require('./routes/user');
//文章分类路由
let category=require('./routes/category');
//2.执行express方法得到app
let app=express();
//如果客户端访问的路径是/开头,会走index路由中间件
app.use('/',index);
//如果客户端访问的路径是/user开头,会走user路由中间件
app.use('/user',user);
//如果客户端访问的路径是/category开头,会走category路由中间件
app.use('/category',category);
//3.监听端口
app.listen(9090);