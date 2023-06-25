var express = require('express');
var router = express.Router();
var mongo =require("./db");
var mongodb =require("mongodb");

var ObjectId = mongodb.ObjectId;

router.post("/userList/getlist", function(req,res) {
	const {
		user,
		currentPage,
		pageSize,
	} = req.body;
	const obj ={
		currentPage,
		pageSize,
	}
	if (user) obj.user = user;
	mongo("findList", "userList", obj, function(data) {
		setTimeout(() => {
			res.send({
				code: 200,
				data,
			});
		}, 1000);
	})
});

// router.post("/userList/del",function(req,res){
// 	mongo("del", "userList", {
// 		id: req.body.id,
// 	}, function(data) {
// 		if(data.result.n == 1){
// 			res.send({ code: 200 });
// 		}else{
// 			res.send({ code: -1 });
// 		}
// 	})
// })

module.exports = router;
