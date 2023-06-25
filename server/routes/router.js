var express = require('express');
var router = express.Router();
var mongo =require("./db");
var mongodb =require("mongodb");

var ObjectId = mongodb.ObjectId;

router.post("/routerList/getlist", function(req,res) {
	mongo("find", "json", {
		name: 'routerList',
	}, function(data) {
		setTimeout(() => {
			res.send({
				code: 200,
				data: JSON.parse(data[0].data),
			});
		}, 200);
	})
});

router.post("/routerList/update",function(req,res){
	const {
		data,
	} = req.body;
	const jsonData = JSON.stringify(data);
	mongo("find", "json", {
		name: 'routerList',
	}, function(data) {
		const obj = {
			...data[0],
			data: jsonData,
		}
		mongo("update", "json", obj, function(data) {
			setTimeout(() => {
				res.send({ code: 200 });
			}, 1000);
		})
	})
})

module.exports = router;
