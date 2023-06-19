//API测试工具 为了仿真 http请求做的模拟，在后端成型前先开发前端。

const http = {};


// http.post = function(data) {
// 	let postobj = {};
// 	postobj.then = function(fun) {
// 		postobj.thencallback = fun;
// 		return postobj;
// 	};
// 	setTimeout(() => {
// 		if (postobj.thencallback) {
// 			postobj.thencallback(data)
// 		}
// 	}, 1000)
// 	return postobj;
// };
// import MPDataManager from "@/public/MPDataManager.js";
import HttpClient from "@/utils/HttpClient.js";

// import Config from "../Config.js";
//联网组件
var httpclient = new HttpClient('http://localhost:3000');

export { http, httpclient};