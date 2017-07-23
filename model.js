//1.先引入mongoose模块
let mongoose=require('mongoose');
//2.连接数据库
let conn=mongoose.createConnection('mongodb://127.0.0.1/201704blog');
//3.定义数据库集合的骨架模型,定义集合中文档的字段的名称和类型
let UserSchema=new mongoose.Schema({
    username:String,//用户名
    password:String,//密码
    email:String,//邮箱
    avatar:String//头像
});
//定义模型
let User=conn.model('User',UserSchema);
exports.User=User;

//文章分类的骨架模型
let CategorySchema=new mongoose.Schema({
    name:String
});
//定义数据库模型
let Category=conn.model('Category',CategorySchema);
exports.Category=Category;