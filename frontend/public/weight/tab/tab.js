/*
 *tab组件
 * */
define(['text!./tab.css', 'weight'], function(tabCss, weight) {
	//默认参数
	var defaultSetting = {
		id: "",
		index: 0, //初始化选中
		behaviour: 'click' //默认是点击触发
	}
	var Tab = function(opts) {
		//初始化默认参数
		this.opts = weight.extend(defaultSetting, opts);
		if (this.opts.id) {
			this.$init();
		} else {
			throw "初始化异常请填写渲染组件id号";
		}
	}
	Tab.prototype = Object.create(weight.prototype);
	Tab.fn = Tab.prototype;
	//初始化动作
	Tab.fn.$init = function() {
		this.render();
	}

	Tab.fn.initEvent = function() {
		var that = this;
		console.log($("#" + this.opts.id).find(".tab-header").children("li"));
		$("#" + this.opts.id).find(".tab-header").children("li")[this.opts.behaviour](function() {
			var tabId = $(this).parent().parent(".tab-wrap").attr('id');
			that.setActive.call(that, tabId, $(this).attr('ind'));
		})
	}

	Tab.fn.render = function() {
		this.renderCss(tabCss, "tab");
		this.initEvent();
		this.setActive(this.opts.id);
	}

	//设置选中
	Tab.fn.setActive = function(tabId, indexTab) {
		var index = 0;
		if (indexTab || indexTab == 0) {
			index = indexTab - 1;
		} else {
			index = this.opts.index;
		}
		$("#" + tabId).find('.tab-header').children("li:eq(" + index + ")").addClass("active").siblings().removeClass("active");
		$("#" + tabId).find('.tab-list').children("div:eq(" + index + ")").addClass("active").siblings().removeClass("active");
	}
	return Tab;
})