let express=require('express');
//生成一个路由中间件的实例
let router=express.Router();
router.get('/signup',function (req,res) {
    res.send('注册')
});
router.post('/signup',function (req,res) {
    res.send('提交注册')
});
router.get('/signin',function (req,res) {
    res.send('登录')
});
router.post('/signup',function (req,res) {
    res.send('提交登录')
});
router.get('/signout',function (req,res) {
    res.send('退出')
});
module.exports=router;