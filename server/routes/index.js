var express = require('express');
var router = express.Router();
var mongo =require("./db");
var mongodb =require("mongodb");


var ObjectId = mongodb.ObjectId;


router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/home/update", function(req, res) {
	const {
		name,
		city,
		id,
	} = req.body;
	const obj ={
		name,
		city,
		id,
	}
	if (id) {
		mongo("update", "home", obj, function(data) {
			res.send({ code: 200 });
		})
	} else {
		mongo("add", "home", obj, function(data) {
			res.send({ code: 200 });
		})
	}
});

router.post("/home/getlist", function(req,res) {
	const {
		name,
		currentPage,
		pageSize,
	} = req.body;
	const obj ={
		currentPage,
		pageSize,
	}
	if (name) obj.name = name
	mongo("find", "home", obj, function(data) {
		res.send({
			code: 200,
			data,
		});
	})
});


router.post("/home/del",function(req,res){
	mongo("del", "home", {
		id: req.body.id
	}, function(data) {
		if(data.result.n == 1){
			res.send({ code: 200 });
		}else{
			res.send({ code: -1 });
		}
	})
})

module.exports = router;
