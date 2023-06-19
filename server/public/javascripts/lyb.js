$(".head li").click(function() {
    $(this).addClass("active").siblings().removeClass("active");
});
$("#send").click(function() {
    sendData();
})

function sendData() {
    // console.log("提交");
    if ($(".nickName").val() && $("#msgTxt").val()) {
        //不为空的时候执行；
        $.ajax({
            //为什么要写users/addmsg
            url: "http://127.0.0.1:3000/users/addmsg",
            type: "post",
            data: {
                imgsrc: $(".head .active img").attr("src"),
                nickName: $(".nickName").val(),
                msg: $("#msgTxt").val()
            },
            success: function(res) {
                console.log(res);
                $(".nickName").val("");
                $("#msgTxt").val("");
                loadlist();
            }
        });
    } else {
        alert("不能为空");
    }
}

 loadlist();
//封装一个渲染的函数： 从数据库中拉取数据；渲染；
function loadlist() {
    $.ajax({
        //通过这个接口拉取数据；
        // getlist 对接数据库，查询，返回；
        url: "http://127.0.0.1:3000/users/getlist",
        type: "post",
        success: function(data) {
            // console.log(data);
            //把这个数据循环到页面中；
            var str = ""
            $.each(data, function(i, item) {
                // console.log(item);
                str += `
						<div class="msg_one">
							<img src="${item.imgsrc}" alt="">
							<div class="msg_info">
								<div>
									<span>${item.nickName}：</span>
									<span>${item.msg}</span>
								</div>
								<div>
									时间：${new Date(item.date).toLocaleString()}
								</div>
								<div>
									<span>赞</span> <span>(100)</span>
									<span>踩</span> <span>(100)</span>
								</div>
							</div>

							<div class="date_del">
								
								<button onclick=del("${item._id}")>删除</button>
							</div>
					</div>
				`
            })

            $(".msg_list").html(str);
        }
    })
}


//鼠标事件：移入显示删除，移出隐藏；
//mouseouve mouseout 多次触发；
$(".msg_list").on("mouseenter",".msg_one",function(){
	$(this).addClass("msgactive").siblings().removeClass("msgactive");
	$(this).find(".date_del").fadeIn();
})


$(".msg_list").on("mouseleave",".msg_one",function(){
	
	$(this).find(".date_del").fadeOut();
})

// $(".msg_list").on("mouseover",".msg_one",function(){
// 	$(this).addClass("msgactive").siblings().removeClass("msgactive");
// 	$(this).find(".date_del").stop().fadeIn();
// })


// $(".msg_list").on("mouseout",".msg_one",function(){
	
// 	$(this).find(".date_del").stop().fadeOut();
// })


//封装删除的方法；
function del(id){
	console.log(id);
	//告诉后端我要删除这个id的数据；
	$.ajax({
		url:"http://127.0.0.1:3000/users/delmsg",
		type:"get",
		data:{
			id:id
		},
		success:function(res){
			console.log(res);
			loadlist();
		}
	});
}