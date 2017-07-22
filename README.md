## 初始化项目
```
npm init -y
```

## 模块依赖的安装
```
npm install express cookie-parser body-parser express-session connect-mongo connect-flash multer ejs mongoose debug  bootstrap -S

```

# 设计路由
## 首页路由
|请求方式|路径|功能|
|:----|:----|:----|
|GET|/|首页|

## 用户路由
|请求方式|路径|功能|
|:----|:----|:----|
|GET|/user/signup|注册|
|POST|/user/signup|提交注册表单|
|GET|/user/signin|登录|
|POST|/user/signin|提交登录表单|
|GET|/user/signout|退出|

## 分类路由
|请求方式|路径|功能|
|:----|:----|:----|
|GET|/category/list|查看分类列表|
|GET|/category/add|得到增加分类的列表|
|POST|/category/add|提交增加分类的列表|

# 设计数据库
## 用户模型
|字段名|字段类型|
|:----|:----|
|username|用户名|
|password|密码|
|email|邮箱|
|avatar|头像|

## 分类模型
|字段名|字段类型|
|:----|:----|
|name|分类名称|