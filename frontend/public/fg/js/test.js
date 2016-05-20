require(['dialog','tab','banner','alert'], function(Dialog,Tab,Banner,Alert) {  //
		var html=$('#form').html();
		html=html.replace("display:none",'');
		var dia=new Dialog({
			title: "登录投之家账号",
			width:550,
			content:html,// '内容<br>内容<br>内容<br>内容<br>内容<br>内容<br>内容<br>内容<br>内容<br>内容<br>内容<br>内容<br>内容<br>',
			//height:380,
			button: [{
				text: '确定',
				className: 'primary',
				callback: function() {
					alert(1);
				}
			}, {
				text: '关闭',
				className: '',
				callback: function() {
					alert(2);
				}
			}]
		})
		//dia.open();


		setTimeout(function(){
			dia.open();
		},1000)
		setTimeout(function(){
			dia.close();
		},3000)

    //
	//var al=new Alert({
	//	title:'登录提示'
	//});
	//al.open();


	var t = new Tab({
		id: 'tab1',
		index:0,
		behaviour:'hover'
	});
	var t2 = new Tab({
		id: 'tab2',
		index:1,
		behaviour:'click'
	});


	var data = ["/download/1.jpg", "/download/2.jpg", "/download/3.jpg", "/download/4.jpg", "/download/5.jpg"];
	var hrefAry = ["http://www.baidu.com", "http://www.hao123.com", "http://www.sina.com"];
	var oBan = document.getElementById("banner");
	var ban = new Banner({
		//必填
		selector: oBan,
		dataAry: data, //焦点图数据json结构
		hrefAry: hrefAry,
		isSwipe: true,
		isAuto: true
	});


})