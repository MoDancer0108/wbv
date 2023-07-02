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
		console.log(data)
		setTimeout(() => {
			res.send({
				code: 200,
				data: {
					total: data.total,
					data: data.data.map(it => ({
						...it,
						password: '******',
					})),
				},
			});
		}, 400);
	})
});
router.post("/userList/update", function(req, res) {
	const {
		user,
		password,
		desc,
		character,
		id,
	} = req.body;
	const obj ={
		user,
		id,
	};
	if (password && password != '******') obj.password = password;
	if (desc) obj.desc = desc;
	if (character) obj.character = character;
	if (id) {
		mongo("update", "userList", obj, function(data) {
			setTimeout(() => {
				res.send({ code: 200 });
			}, 400);
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
				}, 400);
			} else {
				mongo("add", "userList", obj, function(data2) {
					setTimeout(() => {
						res.send({
							code: 200,
						});
					}, 400);
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
			}, 400);
		}else{
			setTimeout(() => {
				res.send({ code: -1 });
			}, 400);
		}
	})
})

// user详情
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
			}, 400);
		} else {
			setTimeout(() => {
				res.send({ code: -1 });
			}, 400);
		}
	})
});

// characterList
router.post("/characterList/getList", function(req,res) {
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
	mongo("findList", "characterList", obj, function(data) {
		setTimeout(() => {
			res.send({
				code: 200,
				data,
			});
		}, 200);
	})
});
router.post("/characterList/update", function(req, res) {
	const {
		name,
		color,
		id,
	} = req.body;
	const obj ={
		name,
		id,
	};
	if (color) obj.color = color;
	if (id) {
		mongo("update", "characterList", obj, function(data) {
			setTimeout(() => {
				res.send({ code: 200 });
			}, 400);
		})
	} else {
		mongo("find", "characterList", {
			name,
		}, function(data) {
			if (data.length) {
				setTimeout(() => {
					res.send({
						code: -1,
						msg: '角色已存在!',
					});
				}, 400);
			} else {
				mongo("add", "characterList", obj, function(data2) {
					setTimeout(() => {
						res.send({
							code: 200,
						});
					}, 400);
				})
			}
		})
	}
});
router.post("/characterList/del",function(req,res){
	mongo("del", "characterList", {
		id: req.body.id,
	}, function(data) {
		if(data.result.n == 1){
			setTimeout(() => {
				res.send({ code: 200 });
			}, 400);
		}else{
			setTimeout(() => {
				res.send({ code: -1 });
			}, 400);
		}
	})
})

module.exports = router;
