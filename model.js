//1.先引入mongoose模块
let mongoose=require('mongoose');
mongoose.Promise=Promise;
let ObjectId=mongoose.Schema.Types.ObjectId;
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
    name:String,
    //ObjectId 是主键  _id的类型,这个user属性是一个外键,引用的User集合的主键
    user:{type:ObjectId,ref:'User'}
});
//定义数据库模型
let Category=conn.model('Category',CategorySchema);
exports.Category=Category;

//定义文章模型
let ArticleSchema=new mongoose.Schema({
    title:String,//标题
    content:String,//文章内容
    category:{type:ObjectId,ref:'Category'},//文章的分类,是用户集合的主键
    user:{type:ObjectId,ref:'User'},//当前文章的作者
    createAt:{type:Date,default:Date.now},//创建时间,类型是日期类型,默认值是当前的时间戳
});
//定义数据库模型
let Article=conn.model('Article',ArticleSchema);
exports.Article=Article;