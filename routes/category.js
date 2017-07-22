let express=require('express');
let router=express.Router();
router.get('/list',function (req,res) {
    res.send('查看分类列表')
});
router.get('/add',function (req,res) {
    res.send('得到添加分类的列表')
});
router.post('/add',function (req,res) {
    res.send('提交增加分类的列表')
})
module.exports=router;