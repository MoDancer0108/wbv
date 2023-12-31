var express = require('express');
var router = express.Router();
var mongo =require("./db");
var mongodb =require("mongodb");

var ObjectId = mongodb.ObjectId;

router.post("/routeList/getList", function(req,res) {
	mongo("find", "json", {
		name: 'routeList',
	}, function(data) {
		setTimeout(() => {
			res.send({
				code: 200,
				data: JSON.parse(data[0].data),
			});
		}, 400);
	})
});

router.post("/routeList/update",function(req,res){
	const {
		data,
	} = req.body;
	const jsonData = JSON.stringify(data);
	mongo("find", "json", {
		name: 'routeList',
	}, function(data) {
		const obj = {
			...data[0],
			data: jsonData,
		}
		mongo("update", "json", obj, function(data) {
			setTimeout(() => {
				res.send({ code: 200 });
			}, 400);
		})
	})
})

module.exports = router;
