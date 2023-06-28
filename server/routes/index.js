var express = require('express');
var router = express.Router();
var mongo =require("./db");
var mongodb =require("mongodb");


var ObjectId = mongodb.ObjectId;

// login

router.post('/reg', function(req, res, next) {
	const {
		user,
		password,
	} = req.body;
	const obj ={
		user,
		password,
	};
	mongo("find", "userList", {
		user,
	}, function(data) {
		if (data.length) {
			setTimeout(() => {
				res.send({
					code: -1,
					msg: '账号已存在!',
				});
			}, 600);
		} else {
			mongo("add", "userList", obj, function(data2) {
				setTimeout(() => {
					res.send({
						code: 200,
					});
				}, 600);
			})
		}
	})
});

router.post('/login', function(req, res, next) {
	const {
		user,
		password,
	} = req.body;
	const obj ={
		user,
		password,
	};
	mongo("find", "userList", obj, function(data) {
		if (data.length) {
			console.log(data)
			setTimeout(() => {
				res.send({
					code: 200,
					data: data[0].id,
				});
			}, 600);
		} else {
			setTimeout(() => {
				res.send({
					code: -1,
					msg: '账号密码不正确!',
				});
			}, 600);
		}
	})
});

module.exports = router;
