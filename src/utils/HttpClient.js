import Axios from "axios";
// import Vue from "vue";
/**
 * 对网路请求进行封装，首先隔离底层包和工程师的使用层，在换网路包的时候不会出现问题。
 * 集成测试数据功能，优化工作流程
 */
// const hcvue = new Vue();
function HttpClient(baseUrl,datamanager) {
	this.WorkingMode = "network";
	this.baseUrl = baseUrl;
	// this.datamanager = datamanager;
}

//处理post请求的返回数据
HttpClient.prototype.handlePost = function(postobj, res,url) {
	if (res) {
		if (postobj.thencallback) {
			postobj.thencallback(res);
			console.log(res, url)
		}
	} else {
		if (postobj.catchcallback) {
			postobj.catchcallback.catch(res);
		} else {
			console.log('============');
			console.log(url);
			console.log('============');
		}
	}
};

HttpClient.prototype.post = function(url, params,isload) {
	params = params ? params : {};
	// uni.hideLoading()
	var loading = null
	// if(isload) {
	// 	loading=uni.showLoading({
	// 		title:'数据加载中',
	// 		mask:false,
			
	// 	})
	// }
	let headers={}  
	//设置公共参数
	// if(this.datamanager)
	// {
	// 	let token = this.datamanager.getData("SYS_Token")?this.datamanager.getData("SYS_Token"):uni.getStorageSync("SYS_Token");
	// 	headers.token = token;
	// }
	
	//设置公共参数
	let postobj = {};
	postobj.then = function(fun) {
		postobj.thencallback = fun;
		return postobj;
	};
	postobj.catch = function(fun) {
		postobj.catchcallback = fun;
		return postobj;
	};
	// return new Promise((resolve,reject)=>{
		// uni.request({
		// 	url:this.baseUrl + url,
		// 	data:params,
		// 	method:"POST",
		// 	header: headers,
		// 	success: (res) => {
				// alert("成功")
				// this.handlePost(postobj, res.data,url);
		// 		if(loading) {
		// 			uni.hideLoading()
		// 		}
		// 		// return uni.showToast({
		// 		// 	title:"成功" + res.data
		// 		// })
		// 		// resolve(res)
		// 	},
		// 	fail: (res) => {
		// 			// alert("失败")
		// 		// return uni.showToast({
		// 		// 	title:"失败" + res
		// 		// })
		// 		// reject(res)
		// 		uni.hideLoading();
		// 		if (postobj.catchcallback) {
		// 			// postobj.catchcallback(err);
		// 		} else {
		// 		}
		// 	},
		// })
	// })
    Axios.post(this.baseUrl + url, params, {
        headers: headers,
    })
        .then((res) => {
            this.handlePost(postobj, res.data, url);
        })
        .catch((err) => {
            if (postobj.catchcallback) {
                // postobj.catchcallback(err);
            } else {
            }
            console.log(err);
        });
	return postobj;
};

export default HttpClient;
