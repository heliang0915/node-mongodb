/*
 *弹框组件 
 * */
define(['text!./dialog.html', 'text!./dialog.css', 'weight'], function(dialogHTML, dialogCss, weight) {
	//默认参数
	var defaultSetting = {
		title: '标题',
		width: 300,
		content: '内容',
		mode: true, //是否模态
		showBtn: true,
		button: [{
			text: '确定',
			callback: null,
			className: 'primary'
		}, {
			text: '取消',
			callback: null,
			className: ''
		}]
	}
	var time = 400;
	var dialogId = "dialog_" + new Date().getTime();
	var Dialog = function(opts) {
		//初始化默认参数
		this.opts = weight.extend(defaultSetting, opts);
		this.$init();
	}
	Dialog.prototype = Object.create(weight.prototype);
	Dialog.fn = Dialog.prototype;
	//初始化动作
	Dialog.fn.$init = function() {
		this.render();
	}

	Dialog.fn.initEvent = function() {
		var self=this;
		var btns = this.opts.button;
		for (var i = 0; i < btns.length; i++) {
			$("#btn_" + i).attr("index", i);
			$("#btn_" + i).on('click', function() {
				var index = $(this).attr("index");
				var btn = btns[index];
				btn.callback != undefined ? btn.callback() : null;
			})
		}
		$('.dialog-close').on('click',function(){
			self.close();
		})
	}
	//居中dialog
	Dialog.fn.dialogCenter = function() {
			var dialogDom = $("#" + dialogId);
			var width = this.opts.width;
			var height = $('#'+dialogId).height();
			var marginTop = height / 2;
			var marginLeft = width / 2;
			dialogDom.width(width);//.height(height+160);
			dialogDom.css('marginTop', -marginTop).css('marginLeft', -marginLeft);
		}
		//渲染dialog
	Dialog.fn.render = function() {
		var that = this;
		var data = {
			id: dialogId,
			title: this.opts.title,
			content: this.opts.content,
			button: renderBtn.call(this)
		};
		this.renderHTML(dialogHTML, data);
		this.renderCss(dialogCss, "dialog");
		this.dialogCenter.call(this);
		this.initEvent();

	}

	Dialog.fn.close = function() {
		var dialogDom = $("#" + dialogId);
		var mask = $(".dialog-mask");
		if (dialogDom.length > 0) {
			dialogDom.fadeOut(time);
			if (this.opts.mode) {
				mask.fadeOut(time);
			}
		}
	}

	Dialog.fn.open = function() {
		var dialogDom = $("#" + dialogId);
		var mask = $(".dialog-mask");
		if (dialogDom.length > 0) {
			dialogDom.fadeIn(time);
			if (this.opts.mode) {
				mask.fadeIn(time);
			}
		}
	}

	function renderBtn() {
		var btnHTML = "";
		var buttons = this.opts.button;
		if (this.opts.showBtn) {
			for (var i = 0; i < buttons.length; i++) {
				var button = buttons[i];
				btnHTML += "<button  id='btn_" + i + "' class='btn btn-normal " + button["className"] + "'>" + button["text"] + "</button>";
			}
		}
		return btnHTML;
	}

	//	//控制是否是模态的
	//	function optMode() {
	//		var mode = this.opts.mode;
	//		var mask = $(".dialog-mask");
	//		if (mode) {
	//			mask.show();
	//		} else {
	//			mask.hide();
	//		}
	//	}

	function getIndex() {
		var index = $(".dialog").length;
		var dialogDom = $("#" + dialogId);
		dialogDom.css("zIndex", index);
	}
	return Dialog;
})