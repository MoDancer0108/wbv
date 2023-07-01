// 封装
var mongodb = require('mongodb');
// 链接mongodb 数据库服务器
var MongoClient = mongodb.MongoClient; //mongodb 客户端
var url = 'mongodb://127.0.0.1:27017'; //数据库地址
var ObjectId =mongodb.ObjectId;
///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var dbName = 'test05'; //链接库名

// 增加一个
var add = function(client, collection, selector, callback) {
  const { id, ...item } = selector
  collection.insertOne({
    ...item,
    createDate: +new Date(),
    updateDate: +new Date(),
  }, function(err, result) {
    if (err) throw err;
    console.log('添加成功');
    callback(result);
    client.close();
  })
}
// 删除一个 作业
var del = function(client, collection, selector, callback) {
  collection.deleteOne({
		_id: ObjectId(selector.id),
	}, function(err, result) {
    if (err) throw err;
    console.log('删除成功');
    callback(result);
    client.close();
  })
}
// 修改一个 方法
var update = function(client, collection, selector, callback) {
  //                  修改条件              修改内容
  const { id, ...item } = selector;
  collection.find({
		_id: ObjectId(id),
	}).toArray(function(e, res) {
    collection.updateOne(res[0], {
      $set: {
        ...res[0],
        ...item,
        updateDate: +new Date(),
        _id: ObjectId(id),
      }
    }, function(
      err,
      result,
    ) {
      if (err) throw err;
      console.log('修改成功');
      callback(result);
      client.close();
    })
  })
}
// 查找
var find = function(client, collection, selector, callback) {
	collection.find(selector).toArray(function(err, reslult) {
		if (err) throw err;
		console.log('查询成功');
		callback(reslult.map(it => {
			const { _id, ...item } = it;
			return { ...item, id: _id };
		}));
		client.close();
	})
}
var findList = function(client, collection, selector, callback) {
  const {
    currentPage,
    pageSize,
    ...obj
  } = selector;
  collection.find().toArray(function(e, res) {
    collection.find(obj).toArray(function(err, reslult) {
      if (err) throw err;
      console.log('查询成功');
      callback({
        total: res.length,
        data: reslult.reverse()
          .map(it => {
            const { _id, ...item } = it;
            return { ...item, id: _id };
          })
          .slice((currentPage-1) * pageSize, currentPage * pageSize)
        ,
      })
      client.close();
    })
  })
}
var methodType = {
	find,
  findList,
  add,
  del,
  update,
}

// type  数据库操作类型
//collections 操作的表名
//selector   操作条件
//callback 操作成功回调
module.exports = function(type, collections, selector, callback) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    var db = client.db(dbName) //链接库名
    var collection = db.collection(collections) //连接表
    methodType[type](client, collection, selector, callback)
  })
}
