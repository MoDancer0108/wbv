var express = require('express');
var router = express.Router();
var mongo =require("./db");
var mongodb =require("mongodb");

var ObjectId = mongodb.ObjectId;

// testList
router.post("/testList/getList", function(req,res) {
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
router.post("/userList/getList", function(req,res) {
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
router.post("/userList/update", function(req, res) {
	const {
		user,
		password,
		desc,
		id,
	} = req.body;
	const obj ={
		user,
		password,
		id,
	};
	if (desc) obj.desc = desc;
	if (id) {
		mongo("update", "userList", obj, function(data) {
			setTimeout(() => {
				res.send({ code: 200 });
			}, 600);
		})
	} else {
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
	}
});
router.post("/userList/del",function(req,res){
	mongo("del", "userList", {
		id: req.body.id,
	}, function(data) {
		if(data.result.n == 1){
			setTimeout(() => {
				res.send({ code: 200 });
			}, 600);
		}else{
			setTimeout(() => {
				res.send({ code: -1 });
			}, 600);
		}
	})
})

// 详情
router.post("/userDetail/get", function(req,res) {
	mongo("find", "userList", {
		_id: ObjectId(req.body.id),
	}, function(data) {
		if (data.length) {
			setTimeout(() => {
				res.send({
					code: 200,
					data: data[0],
				});
			}, 600);
		} else {
			setTimeout(() => {
				res.send({ code: -1 });
			}, 600);
		}
	})
});

module.exports = router;
