var express = require('express');
var router = express.Router();
var mongo =require("./db");
var mongodb =require("mongodb");


var ObjectId = mongodb.ObjectId;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//添加的留言的接口；
router.post("/addmsg",function(req,res){
   //接收接口中带过来的数据；前端的数据；
   //如果前端用post发送的请求，后端用req.body.xxx去拿数据；
   //get，后端req.query.xxx拿数据；
   var obj ={
   	  imgsrc:req.body.imgsrc,
   	  nickName:req.body.nickName,
   	  msg:req.body.msg,
   	  zan:0,
   	  cai:0,
   	  date:new Date()
   }
   //把数据添加到数据库中；
  mongo("insert","msglist",obj,function(data){
  	//给前端发送一条数据；
  	res.send({success:"添加成功"});
  })
});

//拉取数据的接口
router.post("/getlist",function(req,res){
	mongo("find","msglist",{},function(data){
		//数据发送到前端；
		res.send(data.reverse());
	})
});


//删除数据的接口；
router.get("/delmsg",function(req,res){
	//取出参数；
	// objectid  = mongodb.objectid(id);
	// var id = req.query.id;
	// var whereobj={
	// 	_id:ObjectId(id)
	// }
	console.log(id);
	
	mongo("del","msglist",{_id:ObjectId(req.query.id)},function(data){
		// {n:1 }
		//data是数据库给node的数据；  n=1  删除成功 
		if(data.result.n ==1){
			//告诉前端，删除成功了；
			res.send({success:"删除成功"});
		}else{
			res.send({err:"删除失败"});
		}
		// res.send({aa:"aaa"});
	})
})

module.exports = router;
