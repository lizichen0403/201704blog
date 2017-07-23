let express=require('express');
let router=express.Router();
let {Article}=require('../model');
router.get('/',function (req,res) {
    Article.find({user:req.session.user._id}).populate('user').populate('category').exec(function (err,articles) {
        console.log(articles);
        res.render('index',{articles});
    });
});
module.exports=router;