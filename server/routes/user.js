var express = require('express');
var router = express.Router();
var mongo =require("./db");
var mongodb =require("mongodb");

var ObjectId = mongodb.ObjectId;

// testList

router.post("/testList/update", function(req, res) {
	const {
		name,
		city,
		id,
	} = req.body;
	const obj ={
		name,
		city,
		id,
	};
	if (id) {
		mongo("update", "testList", obj, function(data) {
			res.send({ code: 200 });
		})
	} else {
		mongo("add", "testList", obj, function(data) {
			res.send({ code: 200 });
		})
	}
});

router.post("/testList/getlist", function(req,res) {
	const {
		name,
		currentPage,
		pageSize,
	} = req.body;
	const obj ={
		currentPage,
		pageSize,
	}
	if (name) obj.name = name;
	mongo("findList", "testList", obj, function(data) {
		res.send({
			code: 200,
			data,
		});
	})
});


router.post("/testList/del",function(req,res){
	mongo("del", "testList", {
		id: req.body.id,
	}, function(data) {
		if(data.result.n == 1){
			res.send({ code: 200 });
		}else{
			res.send({ code: -1 });
		}
	})
})

// userList

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
		}, 600);
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
